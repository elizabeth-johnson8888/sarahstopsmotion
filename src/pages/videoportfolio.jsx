/**
 * Created By: Elizabeth Johnson
 * Date: 5/8/2025
 * 
 * Shows Video Portfolio
 */
import { useState } from 'react'
import { HeaderTextBox } from "../components/Text"
import { VideoPlayer } from '../components/VideoPlayer'
import { TVFrame } from '../layouts/Frame'
import { VideoCard } from "../components/VideoCard"
import { ImageButton } from '../components/Button'

export function VideoPorfolio ({ videoWorks }) {
    // first video
    const girlhoodWork = videoWorks.find(work => work.id === "girlhood")
    const [ currentVideo, setCurrentVideo ] = useState(girlhoodWork?.videoUrl)

    return (
        <div className="bg-linear-to-b from-secondary from-75% to-secondary-background to-75% w-screen m-0">
            <HeaderTextBox text="Animation and Videos"
                           text_color="text-primary text-center pt-7 md:pt-0 m-0 text-3xl md:text-[4rem] 2xl:text-[6rem]"
                           className=""/>

            <div className="flex flex-col px-5 md:flex-row justify-center md:justify-evenly items-center">
                {/* TV Video Player */}
                <TVFrame frameClassName="h-75 md:h-115" VideoPlayer={<VideoPlayer videoSrc={currentVideo} videoClassName="" />} />

                {/* Video Carosel */}
                <div className="mt-5 flex flex-col bg-background rounded-md justify-center items-center">
                    {/* TV GUIDE header */}
                    <div className="bg-dark-grey w-full rounded-t-md">
                        <HeaderTextBox text="TV GUIDE"
                           text_color="text-accent text-center p-3 pb-2 m-0 text-2xl md:text-[2rem] 2xl:text-[4rem]"
                           className=""/>
                    </div>

                    {/* scrollable video cards */}
                    <div className="p-2 flex flex-col gap-2 h-100 overflow-y-auto w-full" >
                        {videoWorks.map((work) => (
                            <VideoCard videoKey={work.id} videoWork={work} onClick={() => setCurrentVideo(work.videoUrl)} />
                        ))}
                    </div>

                    <ImageButton />
                </div>
            </div>
        </div>
    )
}