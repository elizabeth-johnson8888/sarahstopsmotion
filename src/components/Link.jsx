/* Created By: Elizabeth Johnson
 * Date: 5/3/2026
 * 
 * Defines different links the page can have
 * 
 * - text link
 * - image link
 */
// import { text_font } from "../style/ui"
import { Image } from "./Image";
import { useState } from "react"
import { text_sizes, text_font } from "../style/ui"

export function TextLink ({ text, 
                            link, 
                            className,
                            color, 
                            clicked_color="text-accent" }) {
    const [clicked, setClicked] = useState(false);

    return (
        <>
            <a href={link} 
               target="_blank" 
               rel="noopener noreferrer" 
               onClick={() => setClicked(true)} 
               className={`${clicked ? clicked_color : color} ${text_sizes["large"]} ${text_font["title"]} ${className}`}>
                {text}
            </a>
        </>
    )
}

export function ImageLink ({ alt, 
                             link, 
                             image, 
                             className }) {
    return (
        <>
            <a href={link} 
               target="_blank" 
               rel="noopener noreferrer">
                <Image asset={image} 
                       assetTitle={alt} 
                       className={className} />
            </a>
        </>
    )
}