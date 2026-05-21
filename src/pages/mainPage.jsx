/**
 * Created By: ELizabeth Johnson
 * Date: 5/7/2026
 * 
 * First page people see, Main
 */
import { TextNavBar, TextButtonNavBar } from "../layouts/NavigationBar"
import { HeaderTextBox } from "../components/Text"
import { page_layout } from "../style/ui"

export function MainPage ({}) {
    return (
        <div className={page_layout}>
            {/* mobile screen */}
            <div className="block md:hidden mt-2 ">
                <TextButtonNavBar />
            </div>
            
            <div className="flex flex-col justify-center items-center">
                <HeaderTextBox text="SARAH STOPS MOTION"
                           text_color="text-accent text-center p-0 mt-3 text-7xl md:text-[7rem] md:mt-40 2xl:text-[10rem]"/>
            </div>

            {/* desktop screen */}
            <div className="hidden md:block">
                <TextNavBar className="mt-5" buttonClassName="px-6"/>
            </div>
            
        </div>
    )
}