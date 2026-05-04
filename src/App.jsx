import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { TextButton, ImageButton } from './components/Button'
import { ParagraphBox, CaptionTextBox } from './components/Text'
import './style/utilities/animations.css'
import './style/utilities/effects.css'
import { speed, directions } from './style/ui'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        {/* <TextButton text="button text" onClick={() => console.log("clicked")} animation={["active:animate-scale-fade-out"]} custom_style={{"--animation-speed": speed.xtra_slow, "--translate-direction": directions.s_start }}/> */}
        <p>fake</p>
        {/* <ImageButton asset="src/assets/vite.svg" assetTitle="vite" height="h-36" onClick={() => console.log("clicked image")} text="image text" animation={["hover:animate-wiggle", "hover:animate-eio-base", "active:transition-dark"]} custom_style={{"--animation-speed": speed.xtra_slow, "--animation-iterations": "infinite" }} /> */}
        {/* <ParagraphBox text="paragraph paragraph paragraph" color="text-accent" /> */}
        {/* <CaptionTextBox text="caption caption caption caption" text_color="text-primary" /> */}
      </section>
    </>
  )
}

export default App
