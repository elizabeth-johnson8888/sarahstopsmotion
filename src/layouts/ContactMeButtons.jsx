// 5/26/2026

import { ImageButton } from "../components/Button"

export function ContactMeButtons ({ buttonClassName, className }) {
    return (
        <div className={className}>
            <ImageButton className={buttonClassName}/>
            <ImageButton className={buttonClassName}/>
            <ImageButton className={buttonClassName}/>
            <ImageButton className={buttonClassName}/>
        </div>
    )
}