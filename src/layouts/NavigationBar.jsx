/**
 * Created By: Liz Johnson
 * Date: 2026/05/05
 * 
 * Navitgation Bar
 */
import viteLogo from '../assets/vite.svg'
import { ImageButton, TextButton } from "../components/Button"
import { useState } from "react"

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
    const imageHeight = "h-7"

    return (
        <div className="flex flex-col md:flex-row">
            <ImageButton asset={viteLogo} 
                         assetTitle="vite" 
                         imageClassName={imageHeight} 
                         onClick={() => isClicked(!clicked)} 
                         text="" 
                         className={`shrink-0`}
                         animation={["shrink-0"]} />
            { clicked && (
                <div className="flex flex-col md:flex-row gap-4 md:mx-15 w-full justify-between">
                    <TextButton text="home" 
                                onClick={() => console.log("clicked")}/>
                    <TextButton text="youtube" 
                                onClick={() => console.log("clicked")} />
                    <TextButton text="animations" 
                                onClick={() => console.log("clicked")}/>
                    <TextButton text="house" 
                                onClick={() => console.log("clicked")} />
                    <TextButton text="about me" 
                                onClick={() => console.log("clicked")}
                                className="text-nowrap"/>
                    <TextButton text="resume" 
                                onClick={() => console.log("clicked")} />
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
        <div className={`flex flex-col md:flex-row w-40 md:w-auto justify-center gap-7 xl:gap-10 mx-3 md:mx-15 ${className}`}>
            <TextButton text="youtube" 
                        onClick={() => console.log("clicked")}
                        className={buttonClassName} />
            <TextButton text="animations" 
                        onClick={() => console.log("clicked")}
                        className={buttonClassName}/>
            <TextButton text="house" 
                        onClick={() => console.log("clicked")} 
                        className={buttonClassName}/>
            <TextButton text="about me" 
                        onClick={() => console.log("clicked")}
                        className={buttonClassName}/>
            <TextButton text="resume" 
                        onClick={() => console.log("clicked")} 
                        className={buttonClassName}/>
        </div>
    )
}