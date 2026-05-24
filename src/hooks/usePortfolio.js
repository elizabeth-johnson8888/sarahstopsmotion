// =============================================================================
// src/hooks/usePortfolio.js
// =============================================================================
// This is the heart of the whole system. This custom React hook:
//   1. Fetches portfolio.json to get your list of works + their S3 keys
//   2. For each work, calls AWS to generate a temporary signed URL so the
//      browser can actually load the image or video
//   3. Returns the fully-resolved works array to any component that needs it
//
// WHY SIGNED URLS?
// -----------------
// Even though your S3 bucket allows public reads, Amplify Storage generates
// short-lived "signed" URLs by default. These URLs are safe to embed in
// <img> and <video> tags and expire after 1 hour (configurable).
// This approach also makes it easy to add private/protected content later.
// =============================================================================

import { useState, useEffect } from "react";

// `getUrl` is the Amplify Storage function that takes an S3 key (a path
// like "media/videos/my-film.mp4") and returns a real, loadable URL.
import { getUrl } from "aws-amplify/storage";

// -----------------------------------------------------------------------------
// Helper: resolveS3Url
// -----------------------------------------------------------------------------
// Takes a single S3 key (e.g. "media/thumbnails/film.jpg")
// and returns a full URL that a browser can load.
//
// The URL looks something like:
//   https://portfolioassets-abc123.s3.us-east-1.amazonaws.com/media/thumbnails/film.jpg?X-Amz-Signature=...
//
// It expires after `expiresIn` seconds (default: 3600 = 1 hour).
// -----------------------------------------------------------------------------
async function resolveS3Url(s3Key) {
  // getUrl() contacts AWS and returns a signed URL object.
  // We convert it to a plain string so it works in <img src="..."> tags.
  const result = await getUrl({
    path: s3Key,
    options: {
      expiresIn: 3600, // URL stays valid for 1 hour (3600 seconds)
      // Set validateObjectExistence to true if you want Amplify to confirm
      // the file actually exists in S3 before returning the URL.
      // Useful during development; adds a small network round-trip.
      // validateObjectExistence: true,
    },
  });

  // result.url is a URL object; .toString() gives us a plain string
  return result.url.toString();
}

// -----------------------------------------------------------------------------
// Main Hook: usePortfolio
// -----------------------------------------------------------------------------
// Call this inside any React component to get your full portfolio data
// with all S3 URLs already resolved.
//
// Usage:
//   const { works, loading, error } = usePortfolio();
// -----------------------------------------------------------------------------
export function usePortfolio() {
  // `works` will hold the final array of portfolio items with resolved URLs
  const [works, setWorks] = useState([]);

  // `loading` is true while we're fetching and resolving URLs
  const [loading, setLoading] = useState(true);

  // `error` holds any error message if something goes wrong
  const [error, setError] = useState(null);

  useEffect(() => {
    // We define an async function inside useEffect because useEffect's
    // callback itself can't be async directly.
    async function loadPortfolio() {
      try {
        // -----------------------------------------------------------------
        // STEP 1: Fetch the portfolio index from your /public folder.
        // Because portfolio.json is in /public, it's served at the root
        // of your site — no S3 needed for this tiny text file.
        // -----------------------------------------------------------------
        const response = await fetch("/portfolio.json");

        // If the server returned an error (404, 500, etc.), throw so we
        // land in the catch block below.
        if (!response.ok) {
          throw new Error(`Failed to load portfolio index: ${response.status}`);
        }

        const data = await response.json();
        // data.works is now an array of raw work objects with S3 keys but
        // no real URLs yet — just path strings like "media/videos/film.mp4"

        // -----------------------------------------------------------------
        // STEP 2: For every work, resolve its S3 keys into real URLs.
        //
        // We use Promise.all() so all the URL lookups happen in parallel
        // rather than one-by-one. For 10 works, this is ~10x faster.
        // -----------------------------------------------------------------
        const resolvedWorks = await Promise.all(
          data.works.map(async (work) => {
            // only resolve thumbnail if the work has one
            const thumbnailUrl = work.thumbnail
              ? await resolveS3Url(work.thumbnail)
              : null;

            // Only resolve video URL if this work has a video key
            const videoUrl = work.video
              ? await resolveS3Url(work.video)
              : null;

            // Only resolve image URLs if this work has an images array
            // (i.e. it's a gallery/illustration rather than a video piece)
            const imageUrls =
              work.images && work.images.length > 0
                ? await Promise.all(work.images.map(resolveS3Url))
                : [];

            // Spread the original work data and add the resolved URLs.
            // The original `thumbnail`, `video`, and `images` keys (S3 paths)
            // are still there — we're just adding the resolved URL versions.
            return {
              ...work,        // all original fields (id, title, tags, etc.)
              thumbnailUrl,   // ready-to-use <img src> URL
              videoUrl,       // ready-to-use <video src> URL (or null)
              imageUrls,      // array of ready-to-use <img src> URLs (or [])
            };
          })
        );

        // Update state with the fully-resolved works array
        setWorks(resolvedWorks);
      } catch (err) {
        // Something went wrong (network error, bad JSON, S3 error, etc.)
        // Store the message so the component can show a helpful error state.
        console.error("usePortfolio error:", err);
        setError(err.message);
      } finally {
        // Whether we succeeded or failed, we're no longer loading
        setLoading(false);
      }
    }

    loadPortfolio();
  }, []); // Empty dependency array = run once when the component first mounts

  return { works, loading, error };
}
