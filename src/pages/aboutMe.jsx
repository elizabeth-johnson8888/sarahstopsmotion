// Elizabeth Johnson
// 5/26/2026

import { ContactMeButtons } from "../layouts/ContactMeButtons"
import { HeaderTextBox, SubheaderTextBox, ParagraphTextBox } from "../components/Text"
import { Image } from "../components/Image"

export function AboutMe () {
    return (
        <div className="w-screen flex flex-col justify-center items-center bg-background">
            <div className="w-full flex justify-center md:justify-between md:px-8">
                <ContactMeButtons className="mb-3" />

                <Image className="hidden md:block pr-25 -translate-y-10" />
            </div>

            <div className="flex flex-col md:flex-row w-full justify-center items-center" >
                {/* about the artist words */}
                <div className="w-full flex flex-col bg-[url(../assets/react.svg)] bg-no-repeat bg-contain bg-white/50 bg-blend-lighten md:bg-none md:bg-transparent" >
                    <div className="flex md:flex-col mb-0 md:w-1/2 items-center">
                        {/* top line */}
                        <div className="flex gap-3" >
                            <HeaderTextBox text="About " />
                            <ParagraphTextBox text="the artist" />
                        </div>

                        {/* bottom line */}
                        <div className="hidden md:block">
                            <SubheaderTextBox text="SARAH JOHNSON" />
                        </div>
                    </div>

                    <div className="flex justify-center items-center w-full bg-secondary" >
                        <div className="px-10 md:w-1/2 flex justify-center items-center" >
                            <ParagraphTextBox text="Doodoo is a silly word that people often use to joke around or describe something unpleasant in a funny way. Kids especially enjoy saying it because it sounds goofy and makes people laugh. In cartoons and comedy shows, doodoo is sometimes used to create lighthearted humor without being too serious. Even though the word refers to waste, it has become a common part of playful slang and internet jokes. Some people use it to tease friends by calling bad ideas or mistakes doodoo. " />
                        </div>

                        <div className="hidden md:flex md:w-1/2 justify-center items-start -translate-y-10">
                            <Image className="w-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}