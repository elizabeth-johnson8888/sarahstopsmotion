import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import videoSrc from './assets/videos/video.mp4'
// import heroImg from './assets/hero.png'
import { TextButton, ImageButton } from './components/Button'
import { ParagraphTextBox, CaptionTextBox, HeaderTextBox, SubheaderTextBox } from './components/Text'
import { Image } from './components/Image'
import { TextLink, ImageLink } from './components/Link'
import './style/utilities/animations.css'
import './style/utilities/effects.css'
import { speed, directions } from './style/ui'
import { ImageButtonNavBar, TextButtonNavBar, ImageNavBar, TextNavBar } from './layouts/NavigationBar'
import { VideoPlayer } from './components/VideoPlayer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <TextButton text="button text" onClick={() => console.log("clicked")} animation={["active:animate-scale-fade-out"]} custom_style={{"--animation-speed": speed.xtra_slow, "--translate-direction": directions.s_start }}/>
        <p>fake</p>
        <ImageButton asset={viteLogo} assetTitle="vite" height="" onClick={() => console.log("clicked image")} text="image text" animation={["hover:animate-wiggle", "hover:animate-eio-base", "active:transition-dark"]} custom_style={{"--animation-speed": speed.xtra_slow, "--animation-iterations": "infinite" }} />
        <HeaderTextBox text="Header Header" text_color="text-primary" />
        <SubheaderTextBox text="Subheader Subheader" text_color="text-primary" />
        <ParagraphTextBox text="paragraph paragraph paragraph" color="text-accent" />
        <CaptionTextBox text="caption caption caption caption" text_color="text-primary" />
        <Image asset={viteLogo} assetTitle="vite" height="h-24"/>
        <TextLink text="link" link="https://getbootstrap.com/docs/5.3/components/carousel/" color="text-primary" />
        <ImageLink link="https://getbootstrap.com/docs/5.3/components/carousel/" />
        <ImageButtonNavBar />
        <TextButtonNavBar />
        <ImageNavBar />
        <TextNavBar/>
        <VideoPlayer poster="" className="w-full max-w-4xl aspect-video" videoSrc={videoSrc} />
      </section>
    </>
  )
}

export default App
