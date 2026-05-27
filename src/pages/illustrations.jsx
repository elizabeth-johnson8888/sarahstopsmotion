// Made by Elizabeth Johnson
// 5/25/2026
import { HeaderTextBox } from "../components/Text"
import { Image } from "../components/Image"

export function Illustrations () {
    return (
        <div className="bg-secondary-background m-0 md:pt-10 flex w-screen px-3 items-center pb-10" >
            <div className="hidden md:flex flex-col gap-5 justify-center items-center w-150" >
                <Image className="h-75" />

                <div className="flex gap-15" >
                    <Image className="h-40" />
                    <Image className="h-40" />
                </div>
            </div>

            <div classname="flex flex-col ">
                <div className="flex flex-col items-start">
                    <HeaderTextBox text="Stills &"
                            text_color="text-secondary text-center pt-7 md:pt-0 m-0 text-3xl md:text-[4rem] 2xl:text-[6rem]"
                            className=""/>
                    <HeaderTextBox text="Illustrations!!"
                            text_color="text-secondary text-center md:pt-0 m-0 text-3xl md:text-[4rem] 2xl:text-[6rem]"
                            className="mb-5 "/>
                </div>

                <div className="flex justify-between items-center" >
                    <Image className="md:hidden md:h-80" />
                    <Image className="h-40 md:h-80" />
                    <Image className="md:h-20" />
                </div>
            </div>            
        </div>
    )
}