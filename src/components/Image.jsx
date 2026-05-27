/**
 * Created By: Elizabeth Johnson
 * Date: 5/3/2026
 * 
 * Holds Image
 */

// Defines a paragraph textbox
// assetTitle is for accessibility reasons
export function Image ({ asset="src/assets/react.svg", 
                         assetTitle="react", 
                         className="h-10" }) {
    return (
            <img src={asset} 
                 alt={assetTitle} 
                 className={`m-0 p-0 ${className}`} />
    )
}