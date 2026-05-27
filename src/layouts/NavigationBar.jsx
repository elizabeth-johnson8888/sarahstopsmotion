/**
 * Created By: Liz Johnson
 * Date: 2026/05/05
 * 
 * Navitgation Bar
 */
import viteLogo from '../assets/vite.svg'
import { ImageButton, TextButton } from "../components/Button"
import { useState } from "react"
import { text_sizes } from "../style/ui"

export function ImageButtonNavBar ({}) {
    const [clicked, isClicked] = useState(false)
    const imageHeight = "h-7"

    return (
        <div className="flex flex-col md:flex-row ml-5">
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         onClick={() => isClicked(!clicked)} 
                         text="" 
                         className={`shrink-0`}
                         imageClassName={imageHeight} />
            { clicked && (
                <div className="flex flex-col md:flex-row md:mx-15 w-full justify-between">
                    <ImageButton asset={viteLogo} 
                                 assetTitle="vite" 
                                 imageClassName={`${imageHeight}`} 
                                 onClick={() => console.log("clicked image")} 
                                 text=""  />
                    <ImageButton asset={viteLogo} 
                                 assetTitle="vite" 
                                 imageClassName={imageHeight} 
                                 onClick={() => console.log("clicked image")} 
                                 text=""  />
                    <ImageButton asset={viteLogo} 
                                 assetTitle="vite" 
                                 imageClassName={imageHeight} 
                                 onClick={() => console.log("clicked image")} 
                                 text=""  />
                    <ImageButton asset={viteLogo} 
                                 assetTitle="vite" 
                                 imageClassName={imageHeight} 
                                 onClick={() => console.log("clicked image")} 
                                 text=""  />
                    <ImageButton asset={viteLogo} 
                                 assetTitle="vite" 
                                 imageClassName={imageHeight} 
                                 onClick={() => console.log("clicked image")} 
                                 text=""  />
                    <ImageButton asset={viteLogo} 
                                 assetTitle="vite" 
                                 imageClassName={imageHeight} 
                                 onClick={() => console.log("clicked image")} 
                                 text=""  />
                </div>
            )}
        </div>
    )
}

export function TextButtonNavBar ({}) {
    const [clicked, isClicked] = useState(false)
    const imageHeight = "h-8"

    return (
        <div className="relative w-full">
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         imageClassName={imageHeight} 
                         onClick={() => isClicked(!clicked)} 
                         text="" 
                         className={`shrink-0 p-3`}
                         animation={["shrink-0"]} />
            { clicked && (
                <div className="absolute z-50 flex flex-col gap-2 p-2 w-screen justify-center items-center mt-10">
                    <TextButton text="Home" 
                                onClick={() => console.log("clicked")}
                                className="bg-transparent"
                                />
                    <TextButton text="Animation and Video" 
                                onClick={() => console.log("clicked")}
                                className="bg-transparent" 
                                />
                    <TextButton text="Illustration and Design" 
                                onClick={() => console.log("clicked")}
                                className="bg-transparent"
                                />
                    <TextButton text="About" 
                                onClick={() => console.log("clicked")}
                                className="bg-transparent"
                                />
                    <TextButton text="Resume" 
                                onClick={() => console.log("clicked")}
                                className="text-nowrap bg-transparent"/>
                </div>
            )}
        </div>
    )
}

export function ImageNavBar ({}) {
    const imageHeight = "h-7"

    return (
        <div className="flex flex-col md:flex-row justify-between md:mx-15">
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         imageClassName={imageHeight} 
                         onClick={() => console.log("clicked image")} 
                         text=""  />
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         imageClassName={imageHeight} 
                         onClick={() => console.log("clicked image")} 
                         text=""  />
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         imageClassName={imageHeight} 
                         onClick={() => console.log("clicked image")} 
                         text=""  />
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         imageClassName={imageHeight} 
                         onClick={() => console.log("clicked image")} 
                         text=""  />
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         imageClassName={imageHeight} 
                         onClick={() => console.log("clicked image")} 
                         text=""  />
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         imageClassName={imageHeight} 
                         onClick={() => console.log("clicked image")} 
                         text=""  />
        </div>
    )
}

export function TextNavBar ({ className, buttonClassName }) {

    return (
        <div className={`flex flex-col md:flex-row w-40 md:w-auto justify-center gap-7 xl:gap-10 mx-3 md:mx-0 z-50 ${className}`}>
            <TextButton text="Home" 
                        onClick={() => console.log("clicked")}
                        className={`${text_sizes["nav"]} ${buttonClassName}`} />
            <TextButton text="Animation and Video" 
                        onClick={() => console.log("clicked")}
                        className={`${text_sizes["nav"]} ${buttonClassName}`} />
            <TextButton text="Illustration and Design" 
                        onClick={() => console.log("clicked")} 
                        className={`${text_sizes["nav"]} ${buttonClassName}`} />
            <TextButton text="About" 
                        onClick={() => console.log("clicked")}
                        className={`${text_sizes["nav"]} ${buttonClassName}`} />
            <TextButton text="Resume" 
                        onClick={() => console.log("clicked")} 
                        className={`${text_sizes["nav"]} ${buttonClassName}`} />
        </div>
    )
}