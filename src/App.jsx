import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import { TextButton, ImageButton } from './components/Button'
import { ParagraphTextBox, CaptionTextBox, HeaderTextBox, SubheaderTextBox } from './components/Text'
import { Image } from './components/Image'
import { TextLink, ImageLink } from './components/Link'
import './style/utilities/animations.css'
import './style/utilities/effects.css'
import './style/App.css'
import { speed, directions } from './style/ui'
import { ImageButtonNavBar, TextButtonNavBar, ImageNavBar, TextNavBar } from './layouts/NavigationBar'
import { VideoPlayer } from './components/VideoPlayer'
import { ImageFrame, TVFrame } from './layouts/Frame'
import { MainPage } from './pages/mainPage'
import { VideoPorfolio } from './pages/videoportfolio'
import { Illustrations } from './pages/illustrations.jsx'
import { usePortfolio } from './hooks/usePortfolio.js'

function App() {
  const [count, setCount] = useState(0)
  const [mobileNavBarClicked, setMobileNavBarClicked] = useState(false)
  const { works = [], loading, error } = usePortfolio()

  // when the screen size hits md: breakpoint the mobileNavBarClicked variable turns false
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileNavBarClicked(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ---- Loading state -------------------------------------------------------
  if (loading) {
    return (
      <div className="loading">
        <p>Loading portfolio...</p>
      </div>
    );
  }

  // ---- Error state ---------------------------------------------------------
  if (error) {
    return (
      <div className="error">
        <p>Could not load portfolio: {error}</p>
      </div>
    );
  }

  console.log(works)

  // const girlhoodWork = works.find(work => work.id === "girlhood")

  // Get the Animation Reel video from works
  const girlhoodWork = works.find(work => work.id === "girlhood")
  
  // get all the works that are part of the video porfolio
  const videoWorks = works.filter(work => work.section === "video" )

  return (
    <>
      <section id="pageBody"
              className="min-h-screen bg-(--color-background)">
          {/* desktop screen */}
          <div className="hidden md:block md:fixed z-50">
              <TextNavBar className="mt-0 mx-0 md:w-screen bg-primary" buttonClassName="px-6"/>
          </div>

          {/* mobile screen */}
          <div className="block md:hidden mt-0 fixed z-30"
               onClick={() => setMobileNavBarClicked(prev => !prev)}>
              <TextButtonNavBar />
          </div>
            
        { !mobileNavBarClicked && (
          <div className='p-0 m-0'>
            <MainPage  animationSrc={girlhoodWork?.videoUrl } editingSrc={girlhoodWork?.videoUrl } />
            <VideoPorfolio videoWorks={videoWorks} />
            <Illustrations />
            {/* <TVFrame VideoPlayer={<VideoPlayer videoSrc={girlhoodWork?.videoUrl} />} /> */}
          </div>

        )}
      </section>
    </>
  )
}

export default App
