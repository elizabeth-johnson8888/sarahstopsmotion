/* Created By: Elizabeth Johnson
 * Date: 5/3/2026
 * 
 * Defines different links the page can have
 * 
 * - text link
 * - image link
 */
// import { text_font } from "../style/ui"
import { useState } from "react"

export function TextLink ({ text, link, color, clicked_color="text-accent" }) {
    const [clicked, setClicked] = useState(false);

    return (
        <>
            <a href={link} target="_blank" rel="noopener noreferrer" onClick={() => setClicked(true)} className={clicked ? clicked_color : color}>
                {text}
            </a>
        </>
    )
}

export function ImageLink ({ alt, link, image }) {
    
}