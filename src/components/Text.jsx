/**
 * Created By: Elizabeth Johnson
 * Date: 5/3/2026
 * 
 * - Paragraph text box
 * - Caption text box
 */

import { text_sizes, text_font } from "../style/ui"

// Defines a paragraph textbox
export function ParagraphTextBox ({ text, color }) {
    return (
        <>
            <p className={`p-3 m-1 ${text_sizes.base} ${text_font.basic} ${color}`}>{text}</p>
        </>
    )
}

/* 
    Defines caption textbox

    caption background will not default to parent background
*/
export function CaptionTextBox ({ text, text_color }) {
    return (
        <>
            <p className={`p-3 m-1 ${text_sizes.sm} ${text_font.basic} ${text_color} bg-inherit`}>{text}</p>
        </>
    )
}