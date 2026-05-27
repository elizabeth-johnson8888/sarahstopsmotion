// Made by Elizabeth Johnson
// 5/25/2026
import { useState } from 'react'
import { ImageButton } from './Button'
import { Image } from './Image'
import { SubheaderTextBox, ParagraphTextBox, CaptionTextBox } from './Text'

export function VideoCard ({ videoKey, videoWork, onClick }) {
    const [expanded, setExpanded] = useState(false)

    function formatDate(dateString) {
        const year = dateString.slice(0, 4)
        const month = dateString.slice(4, 6)
        const day = dateString.slice(6, 8)

        const date = new Date(year, month - 1, day)

        return date.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
    }

    return (
        <div className='flex flex-col rounded-md bg-med-grey p-2 justify-center items-center w-75 md:w-115' onClick={onClick}>
            {/* Not expanded information */}
            <div className='flex w-full justify-start' >
                <Image asset={videoWork?.thumbnailUrl} className="h-15" />

                {/* Holds  title, date, length details*/}
                <div className="flex flex-col w-full pl-2">
                    <SubheaderTextBox  text={videoWork?.title} text_color="text-primary" />

                    <div className="flex">
                        <CaptionTextBox text={`${videoWork?.videoTime} | ${formatDate(videoWork?.date)}`} color="text-primary" />
                    </div>
                </div>
            </div>

            {/* Show exapnded information */}
            { expanded && (
                <div>
                    <ParagraphTextBox text={videoWork?.description} color="text-primary" />
                </div>
            )}

            {/* button that opens up the video description */}
            <ImageButton onClick={() => { console.log("clicked", expanded); setExpanded(prev => !prev) } } />
        </div>
    )
}