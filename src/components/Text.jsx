/**
 * Created By: Elizabeth Johnson
 * Date: 5/3/2026
 * 
 * - Paragraph text box
 * - Caption text box
 * - Header text box
 * - Subheader text box
 */

import { text_sizes, text_font } from "../style/ui"

// Defines a paragraph textbox
export function ParagraphTextBox ({ text, color }) {
    return (
        <>
            <p className={`${text_sizes.base} ${text_font.basic} ${color}`}>{text}</p>
        </>
    )
}

/* 
    Defines caption textbox

    caption background will not default to parent background
*/
export function CaptionTextBox ({ text, color }) {
    return (
        <>
            <p className={`${text_sizes.sm} ${text_font.basic} ${color} bg-inherit`}>{text}</p>
        </>
    )
}


/* 
    Defines header textbox
*/
export function HeaderTextBox ({ text, text_color, className }) {
    return (
        <div className={className}>
            <h1 className={`p-3 ${text_sizes.xl} ${text_font.title} ${text_color}`}>{text}</h1>
        </div>
    )
}

/* 
    Defines subheader textbox
*/
export function SubheaderTextBox ({ text, text_color }) {
    return (
        <>
            <h1 className={` ${text_sizes.large} ${text_font.title} ${text_color}`}>{text}</h1>
        </>
    )
}