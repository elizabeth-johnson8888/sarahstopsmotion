// Made by Elizabeth Johnson
// 5/25/2026
import { HeaderTextBox } from "../components/Text"
import { Image } from "../components/Image"

export function Illustrations () {
    return (
        <div className="bg-secondary-background m-0 md:pt-10 pb-5 md:pb-10 px-3 flex items-center justify-center w-screen" >
            <div className="hidden md:flex flex-col gap-7 justify-center items-center w-1/3 " >
                <Image className="h-75" />

                <div className="flex justify-evenly w-full" >
                    <Image className="h-40" />
                    <Image className="h-40" />
                </div>
            </div>

            <div className="flex flex-col justify-center items-center w-full md:w-2/3 ">
                <div className="flex flex-col md:items-start items-center">
                    <HeaderTextBox text="Stills &"
                            text_color="text-secondary text-center pt-7 md:pt-0 m-0 text-3xl md:text-[4rem] 2xl:text-[6rem]"
                            className=""/>
                    <HeaderTextBox text="Illustrations!!"
                            text_color="text-secondary text-center md:pt-0 m-0 text-3xl md:text-[4rem] 2xl:text-[6rem]"
                            className="mb-5 md:mb-10"/>
                </div>

                <div className="flex justify-between md:justify-evenly items-center px-2 w-full" >
                    <Image className="md:hidden md:h-80" />
                    <Image className="h-40 md:h-80" />
                    <Image className="md:h-20" />
                </div>
            </div>            
        </div>
    )
}