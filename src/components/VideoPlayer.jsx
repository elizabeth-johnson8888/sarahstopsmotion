/**
 * VideoPlayer.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Custom HTML5 video player — React + Tailwind CSS, Vite projects
 *
 * HOW VITE SVG IMPORTS WORK:
 *   `import playIcon from "./assets/icons/play.svg"`
 *   Vite resolves the file and gives back a URL string (e.g. /assets/play-abc123.svg).
 *   We pass that URL to <img src={...}> — the browser fetches and renders it
 *   like any image. No inline SVG markup required.
 *
 * NOTE ON `className="invert"`:
 *   This CSS filter flips a black/dark SVG to white so it shows up on the dark
 *   controls overlay. If your icons are already white/light-coloured, remove it.
 *
 * USAGE:
 *   import VideoPlayer from "./VideoPlayer";
 *   <VideoPlayer className="w-full max-w-4xl aspect-video" />
 * ─────────────────────────────────────────────────────────────────────────────
 */

import React, { useRef, useState, useEffect, useCallback } from "react";

// ─── ICON SVG ASSETS ─────────────────────────────────────────────────────────
// Each import returns a URL string pointing to the resolved/hashed SVG file.
// We collect them into an ICONS object so the JSX stays clean and readable.
// To swap an icon: just replace the file at its path — no code changes needed.
import playIcon           from "../assets/icons/play.svg";
import pauseIcon          from "../assets/icons/pause.svg";
import skipBackIcon       from "../assets/icons/skip-back.svg";
import skipForwardIcon    from "../assets/icons/skip-forward.svg";
import volumeOnIcon       from "../assets/icons/volume-on.svg";
import volumeOffIcon      from "../assets/icons/volume-off.svg";
import fullscreenIcon     from "../assets/icons/fullscreen.svg";
import exitFullscreenIcon from "../assets/icons/exit-fullscreen.svg";
import spinnerIcon        from "../assets/icons/spinner.svg";

/** Centralised icon map — keeps every <img src={ICONS.x}> tidy below */
const ICONS = {
  play:           playIcon,
  pause:          pauseIcon,
  skipBack:       skipBackIcon,
  skipForward:    skipForwardIcon,
  volumeOn:       volumeOnIcon,
  volumeOff:      volumeOffIcon,
  fullscreen:     fullscreenIcon,
  exitFullscreen: exitFullscreenIcon,
  spinner:        spinnerIcon,
};

// ─── HELPER ───────────────────────────────────────────────────────────────────

/**
 * formatTime(seconds) → "m:ss"
 * Converts a raw second count into a human-readable time string.
 *   75  → "1:15"
 *    3  → "0:03"
 *  NaN  → "0:00"
 */
function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─────────────────────────────────────────────────────────────────────────────

/**
 * VideoPlayer component
 *
 * Props:
 *   poster    {string}  Optional thumbnail image URL shown before first play.
 *   className {string}  Tailwind classes for the outer wrapper.
 *                       Use this to control size, e.g. "w-full max-w-4xl aspect-video"
 */
export function VideoPlayer({ poster, className = "", videoSrc }) {

  // ── DOM refs ───────────────────────────────────────────────────────────────
  const videoRef      = useRef(null); // the <video> element itself
  const containerRef  = useRef(null); // outer div — passed to requestFullscreen()
  const seekRef       = useRef(null); // progress bar track — used for click-position math
  const controlsTimer = useRef(null); // handle for the auto-hide setTimeout

  // ── State ──────────────────────────────────────────────────────────────────
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [currentTime,  setCurrentTime]  = useState(0);    // seconds played
  const [duration,     setDuration]     = useState(0);    // total video length in seconds
  const [buffered,     setBuffered]     = useState(0);    // 0–1: fraction of video downloaded
  const [volume,       setVolume]       = useState(1);    // 0 (silent) – 1 (max)
  const [isMuted,      setIsMuted]      = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBuffering,  setIsBuffering]  = useState(false); // true while waiting for network data
  const [showControls, setShowControls] = useState(true);  // auto-hides after 3 s of inactivity

  // ── Derived value ──────────────────────────────────────────────────────────
  // A 0–1 fraction representing playback position.
  // Used to set the width of the played-progress bar and position the thumb.
  const progress = duration > 0 ? currentTime / duration : 0;

  // ══════════════════════════════════════════════════════════════════════════
  // VIDEO EVENT HANDLERS
  // These props on <video> mirror the element's internal state into React.
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * onLoadedMetadata
   * Fires once the browser has parsed the video header (dimensions, duration).
   * This is the earliest point where `video.duration` is a real number.
   */
  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  /**
   * onTimeUpdate
   * Fires approximately 4 times per second during playback.
   * Updates currentTime and recalculates how much has been buffered.
   *
   * `video.buffered` is a TimeRanges object — it may have multiple discontiguous
   * ranges if the user seeked around. We take the end of the last range as the
   * high-water mark for the buffered progress display.
   */
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    setCurrentTime(video.currentTime);

    if (video.buffered.length > 0) {
      const bufferedEnd = video.buffered.end(video.buffered.length - 1);
      setBuffered(bufferedEnd / video.duration); // store as 0–1 fraction
    }
  };

  /**
   * onWaiting — browser stalled waiting for more data from the network.
   * Show the buffering spinner overlay.
   */
  const handleWaiting = () => setIsBuffering(true);

  /**
   * onCanPlay — enough data has loaded to resume playback without stalling.
   * Hide the buffering spinner.
   */
  const handleCanPlay = () => setIsBuffering(false);

  // Keep React's isPlaying in sync if the browser plays/pauses independently
  const handlePlay  = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  /**
   * onEnded — video reached the final frame.
   * Reset UI to the beginning so the user can watch again.
   */
  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  // ══════════════════════════════════════════════════════════════════════════
  // CONTROL ACTIONS
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * togglePlay
   * The primary action: starts or stops playback.
   * Wrapped in useCallback to keep the keyboard-shortcut effect stable —
   * it only recreates when `isPlaying` changes.
   */
  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    isPlaying ? video.pause() : video.play();
  }, [isPlaying]);

  /**
   * skipBack — jump 10 seconds earlier.
   * Math.max(0, …) clamps to the start of the video.
   */
  const skipBack = () => {
    videoRef.current.currentTime =
      Math.max(0, videoRef.current.currentTime - 10);
  };

  /**
   * skipForward — jump 10 seconds ahead.
   * Math.min(duration, …) clamps to the end of the video.
   */
  const skipForward = () => {
    videoRef.current.currentTime =
      Math.min(duration, videoRef.current.currentTime + 10);
  };

  /**
   * toggleMute
   * Silences the video or restores audio.
   * When unmuting, restores to the last known volume level (defaults to 0.5).
   */
  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (isMuted) {
      video.muted  = false;
      video.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  }, [isMuted, volume]);

  /**
   * handleVolumeChange
   * Called by the <input type="range"> volume slider.
   * Setting volume to 0 automatically mutes; any value above 0 unmutes.
   */
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    videoRef.current.volume = val;
    videoRef.current.muted  = val === 0;
    setVolume(val);
    setIsMuted(val === 0);
  };

  /**
   * handleSeekClick
   * Fires when the user clicks anywhere on the seek bar track.
   *
   * Steps:
   *   1. getBoundingClientRect() returns the bar's screen position.
   *   2. Subtract left edge from click X → pixel offset inside the bar.
   *   3. Divide by bar width → fraction 0–1.
   *   4. Multiply by duration → target time in seconds.
   *   5. Set video.currentTime and update React state.
   */
  const handleSeekClick = (e) => {
    const rect     = seekRef.current.getBoundingClientRect();
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime  = fraction * duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  /**
   * toggleFullscreen
   * Requests fullscreen on the outer container div via the browser API.
   * Optional chaining (?.) gracefully handles browsers that don't support it.
   * Wrapped in useCallback for stability in the keyboard effect.
   */
  const toggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!document.fullscreenElement) {
      await el.requestFullscreen?.();
      // Safari fallback (add if needed): el.webkitRequestFullscreen?.();
    } else {
      await document.exitFullscreen?.();
    }
  }, []);

  // ══════════════════════════════════════════════════════════════════════════
  // SIDE EFFECTS
  // ══════════════════════════════════════════════════════════════════════════

  /**
   * Sync isFullscreen with the browser's real fullscreen state.
   * The `fullscreenchange` event also fires when the user presses Escape,
   * so the icon always stays accurate regardless of how fullscreen ends.
   */
  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);

    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  /**
   * Auto-hide controls.
   * `resetControlsTimer` shows the controls and restarts a 3-second countdown.
   * It is called on every mouse move inside the player.
   * When the video is paused the controls always stay visible (no timer is set).
   */
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(controlsTimer.current);
    if (isPlaying) {
      controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [isPlaying]);

  // Re-arm the timer whenever play state changes
  useEffect(() => {
    resetControlsTimer();
    return () => clearTimeout(controlsTimer.current);
  }, [isPlaying, resetControlsTimer]);

  /**
   * Global keyboard shortcuts.
   * Attached to `window` so they work without clicking inside the player first.
   * Guards against firing inside <input> / <textarea> elements.
   *
   *   Space  → play / pause
   *   ←      → skip back 10 s
   *   →      → skip forward 10 s
   *   F      → toggle fullscreen
   *   M      → toggle mute
   */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
      switch (e.code) {
        case "Space":      e.preventDefault(); togglePlay();      break;
        case "ArrowLeft":  e.preventDefault(); skipBack();        break;
        case "ArrowRight": e.preventDefault(); skipForward();     break;
        case "KeyF":       toggleFullscreen();                    break;
        case "KeyM":       toggleMute();                          break;
        default: break;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [togglePlay, toggleFullscreen, toggleMute]);

  // ══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════════════════════════════════════════
  return (
    /**
     * Outer container
     *   relative     → anchors the absolute overlays (spinner, controls)
     *   group        → enables Tailwind group-hover utilities on children
     *   tabIndex=0   → makes the div focusable for keyboard events
     *   overflow-hidden + rounded-2xl → clips the video to rounded corners
     */
    <div
      ref={containerRef}
      tabIndex={0}
      onMouseMove={resetControlsTimer}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      className={`
        relative group overflow-hidden bg-black
        select-none outline-none focus:ring-2 focus:ring-white/30
        ${className}
      `}
    >

      {/* ── VIDEO ELEMENT ────────────────────────────────────────────────────
           object-contain  → letterboxes the video, no cropping
           block           → removes the browser's default inline-element gap
           preload="metadata" → fetches only the header (duration, size) on load,
                               not the full video, saving bandwidth
           Clicking the video itself toggles play, matching YouTube/Netflix UX.
      ───────────────────────────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="w-full h-full object-contain block"
        preload="metadata"
        onClick={togglePlay}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={handleWaiting}
        onCanPlay={handleCanPlay}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnded={handleEnded}
      />

      {/* ── BUFFERING SPINNER OVERLAY ────────────────────────────────────────
           Only rendered while `isBuffering` is true (onWaiting → onCanPlay).
           Covers the full player with a translucent dark layer.
           pointer-events-none → clicks still reach the video beneath.
           animate-spin        → Tailwind CSS rotation; works for circular SVGs.
                                 Remove if your spinner SVG self-animates.
      ───────────────────────────────────────────────────────────────────────── */}
      {isBuffering && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 pointer-events-none">
          <img
            src={ICONS.spinner}
            alt="Buffering"
            className="w-14 h-14 animate-spin invert"
          />
        </div>
      )}

      {/* ── CONTROLS OVERLAY ─────────────────────────────────────────────────
           Sits over the bottom portion of the video.
           bg-gradient-to-t → fades from near-black at bottom to transparent,
                              so controls are readable without blocking the video.
           transition-opacity → smooth fade when showControls toggles.
           pointer-events-none when hidden → clicks pass through to the video.
      ───────────────────────────────────────────────────────────────────────── */}
      <div
        className={`
          absolute bottom-0 left-0 right-0 z-10
          px-4 pb-4 pt-20
          bg-gradient-to-t from-black/90 via-black/50 to-transparent
          transition-opacity duration-300
          ${showControls ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >

        {/* ── SEEK / PROGRESS BAR ────────────────────────────────────────────
             Three layers share the same horizontal track:
               Layer 1 (background): translucent dark track  — bg-white/20
               Layer 2 (buffered):   lighter bar showing downloaded amount
               Layer 3 (played):     white bar showing elapsed time
             A scrubber thumb appears on hover using the `group/seek` variant.
             Clicking anywhere calls handleSeekClick to jump to that position.
        ──────────────────────────────────────────────────────────────────────── */}
        <div
          ref={seekRef}
          onClick={handleSeekClick}
          role="slider"
          aria-label="Seek"
          aria-valuenow={Math.round(currentTime)}
          aria-valuemin={0}
          aria-valuemax={Math.round(duration)}
          className="relative w-full h-1.5 rounded-full bg-white/20 cursor-pointer mb-4 group/seek"
        >
          {/* Layer 2 – buffered portion */}
          <div
            className="absolute inset-y-0 left-0 bg-white/35 rounded-full pointer-events-none"
            style={{ width: `${buffered * 100}%` }}
          />

          {/* Layer 3 – played portion */}
          <div
            className="absolute inset-y-0 left-0 bg-white rounded-full pointer-events-none"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Scrubber thumb — fades in when hovering the seek bar */}
          <div
            className="
              absolute top-1/2 -translate-y-1/2 -translate-x-1/2
              w-3.5 h-3.5 rounded-full bg-white shadow-md pointer-events-none
              opacity-0 group-hover/seek:opacity-100 transition-opacity duration-150
            "
            style={{ left: `${progress * 100}%` }}
          />
        </div>

        {/* ── BOTTOM ROW ─────────────────────────────────────────────────────
             Left side:  [ skip-back ] [ play/pause ] [ skip-forward ] [ time ]
             Right side: [ volume (mute + slider) ] [ fullscreen ]
        ──────────────────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-2">

          {/* Skip Back 10 s ─────────────────────────────────────────────── */}
          <button
            onClick={skipBack}
            aria-label="Skip back 10 seconds"
            className="w-8 h-8 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity focus:outline-none"
          >
            {/*
              src   = URL from the Vite import of skip-back.svg
              invert = CSS filter: turns a black SVG white for dark backgrounds.
                       Remove if your icon is already white/light.
            */}
            <img src={ICONS.skipBack} alt="Skip back 10s" className="w-5 h-5 invert" />
          </button>

          {/* Play / Pause ─────────────────────────────────────────────────── */}
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="w-10 h-10 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity focus:outline-none"
          >
            {/* Swap between play.svg and pause.svg based on isPlaying state */}
            <img
              src={isPlaying ? ICONS.pause : ICONS.play}
              alt={isPlaying ? "Pause" : "Play"}
              className="w-7 h-7 invert"
            />
          </button>

          {/* Skip Forward 10 s ───────────────────────────────────────────── */}
          <button
            onClick={skipForward}
            aria-label="Skip forward 10 seconds"
            className="w-8 h-8 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity focus:outline-none"
          >
            <img src={ICONS.skipForward} alt="Skip forward 10s" className="w-5 h-5 invert" />
          </button>

          {/* Time display ────────────────────────────────────────────────── */}
          {/*
            tabular-nums  → monospaced digit widths so "0:09" → "0:10" doesn't shift layout
            font-mono     → consistent character spacing
            shrink-0      → prevents the time label from being squished by flexbox
          */}
          <span className="text-white/90 text-xs tabular-nums font-mono ml-1 shrink-0">
            {formatTime(currentTime)}
            <span className="text-white/40 mx-1">/</span>
            {formatTime(duration)}
          </span>

          {/* Flex spacer — pushes volume + fullscreen to the right edge */}
          <div className="flex-1" />

          {/* Volume group ────────────────────────────────────────────────────
               `group/vol` scopes Tailwind's group-hover so the slider can
               expand from 0 → 80px only when this specific group is hovered.
          ──────────────────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-1.5 group/vol">

            {/* Mute / unmute button */}
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="w-8 h-8 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity focus:outline-none"
            >
              {/* Switch between volume-on.svg and volume-off.svg */}
              <img
                src={isMuted ? ICONS.volumeOff : ICONS.volumeOn}
                alt={isMuted ? "Unmute" : "Mute"}
                className="w-5 h-5 invert"
              />
            </button>

            {/* Volume range slider
                Hidden (w-0) by default, expands to w-20 on group/vol hover.
                `accent-white` colours the browser's native thumb and fill white.
                For a fully custom thumb, add pseudo-element styles in index.css:
                  input[type='range']::-webkit-slider-thumb { ... }
                  input[type='range']::-moz-range-thumb     { ... }
            */}
            <input
              type="range"
              min={0}
              max={1}
              step={0.02}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="
                w-0 group-hover/vol:w-20
                transition-[width] duration-300
                h-1 cursor-pointer accent-white
                appearance-none bg-white/25 rounded-full overflow-hidden
              "
            />
          </div>

          {/* Fullscreen toggle ───────────────────────────────────────────── */}
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="w-8 h-8 flex items-center justify-center opacity-75 hover:opacity-100 transition-opacity focus:outline-none ml-1"
          >
            {/* Switch between fullscreen.svg and exit-fullscreen.svg */}
            <img
              src={isFullscreen ? ICONS.exitFullscreen : ICONS.fullscreen}
              alt={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              className="w-5 h-5 invert"
            />
          </button>

        </div>{/* end bottom row */}
      </div>{/* end controls overlay */}

    </div>/* end outer container */
  );
}

/* ─── QUICK-START ────────────────────────────────────────────────────────────

  1. Place this file at:  src/VideoPlayer.jsx

  2. Add your icons at (exactly these filenames):
       src/assets/icons/play.svg
       src/assets/icons/pause.svg
       src/assets/icons/skip-back.svg
       src/assets/icons/skip-forward.svg
       src/assets/icons/volume-on.svg
       src/assets/icons/volume-off.svg
       src/assets/icons/fullscreen.svg
       src/assets/icons/exit-fullscreen.svg
       src/assets/icons/spinner.svg

  3. Add your video at:   src/assets/video.mp4

  4. Use it in App.jsx:

       import VideoPlayer from "./VideoPlayer";

       export default function App() {
         return (
           <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-8">
             <VideoPlayer
               poster="https://example.com/thumbnail.jpg"  // optional
               className="w-full max-w-4xl aspect-video"
             />
           </div>
         );
       }

  KEYBOARD SHORTCUTS:
    Space  → Play / Pause
    ←      → Skip back 10 s
    →      → Skip forward 10 s
    F      → Toggle fullscreen
    M      → Toggle mute

────────────────────────────────────────────────────────────────────────────── */