/**
 * Created By: ELizabeth Johnson
 * Date: 5/7/2026
 * 
 * First page people see, Main
 */
import { TextNavBar, TextButtonNavBar } from "../layouts/NavigationBar"
import { HeaderTextBox } from "../components/Text"
import { page_layout } from "../style/ui"
import { Image } from "../components/Image"
import { MainPageVideoPlayer } from "../components/MainPageVideoPlayer"
import { ImageButton } from "../components/Button"
import { ContactMeButtons } from "../layouts/ContactMeButtons"

export function MainPage ({ animationSrc, editingSrc }) {
    console.log( animationSrc, editingSrc )
    return (
        <div className={`${page_layout} justify-center items-center`}>
            <HeaderTextBox text="SARAH STOPS MOTION"
                           text_color="text-accent text-center p-3 mt-15 text-7xl md:text-[7rem] 2xl:text-[10rem]"
                           className="w-screen bg-primary"/>
            
            {/* holds animation and editing reels on top of face piture */}
            <div className="flex flex-col m-3 mb-0 pt-3 justify-center items-center relative">
                <div className="flex flex-col md:flex-row md:gap-30 z-2 px-6 justify-center items-center relative" >
                    <MainPageVideoPlayer videoClassName="w-full max-w-sm relative md:-translate-y-5" videoSrc={animationSrc} caption="animation" />
                    <MainPageVideoPlayer videoClassName="w-full max-w-sm relative md:translate-y-5" videoSrc={animationSrc} caption="editing" />
                </div>
                <Image assetTitle="vite" className="h-82 md:h-85 2xl:h-150 mb-0 pb-0 absolute top-1/2"/>
                <div className="h-41 md:h-42 2xl:h-75" />
            </div>

            {/* hands images over the border + contact buttons */}
            <div className="flex flex-col justify-center items-center relative">
                {/* hands images */}
                <div className="flex gap-35 md:gap-155 m-0 p-0 z-2 relative">
                    <Image assetTitle="vite" className="h-20 md:h-50 2xl:h-90 m-0 p-0 -translate-y-10"/>
                    <Image assetTitle="vite" className="h-20 md:h-50 2xl:h-90 m-0 p-0 -translate-y-10"/>
                </div>

                {/* border + contact buttons */}
                <ContactMeButtons className="flex bg-secondary w-screen justify-center items-center p-5 m-0 absolute top-0 h-22 md:top-auto md:bottom-0 md:h-auto"
                                  buttonClassName="translate-y-7 md:translate-y-0"/>
            </div>
        </div>
    )
}