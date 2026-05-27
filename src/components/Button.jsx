/* 
    Created by: Elizabeth Johnson
    Date: 5/2/2026

    This file will hold any types of buttons that will be needed for sarah's site.

    - TextButton
    - ImageButton
*/
import { text_sizes, text_font } from "../style/ui"


/* 
    TextButton - Generic button that holds text

    * button changes size dynamically according to text inside

    text: what text the button will hold
    size: text size from src/style/ui.js text_sizes ---------- OPTIONAL
    font: custom font from src/style/ui.js text_font --------- OPTIONAL
    background: sets background color ------------------------ OPTIONAL
    text_color: sets text color ------------------------------ OPTIONAL
    onClick: tells button what to do when clicked
    animation: list of animation utilities for button -------- OPTIONAL
    custom_style: change animation variables ----------------- OPTIONAL
*/
export function TextButton({ text, 
                             className, 
                             onClick, 
                             custom_style={} }) {
  return (
    <>
      <button className={`p-3 m-1 inline-block rounded-md ${text_font["title"]} bg-primary text-accent ${className}`} 
              style={custom_style} 
              onClick={onClick}>
        {text}
      </button>
    </>
  )
}


/* 
    ImageButton

    Generic button that holds an image

    asset: file path to image asset
    assetTitle: name of asset for alt
    height: height of image
    onClick: tells button what to do when clicked
    text: button text ------------------------------------ OPTIONAL
    size: sets text size --------------------------------- OPTIONAL
    font: sets font type --------------------------------- OPTIONAL
    text_color: sets text color -------------------------- OPTIONAL
    animation: list of animation utilities for button ---- OPTIONAL
    custom_style: change animation variables ------------- OPTIONAL
*/
export function ImageButton({ asset="src/assets/react.svg", 
                              assetTitle="react", 
                              height="", 
                              onClick, 
                              text, 
                              size="large", 
                              font="title", 
                              text_color="text-accent", 
                              className,
                              imageClassName, 
                              custom_style={} }) {
  return (
    <>
      <button className={`p-0 m-0 relative inline-block ${className}`} 
              style={custom_style} 
              onClick={onClick}
              type="button">
        <img src={asset} 
             alt={assetTitle} 
             className={`m-0 p-0 ${imageClassName} w-auto`} />
        <div className={`absolute inset-0 flex items-center justify-center ${text_sizes[size]} ${text_font[font]} ${text_color}`}>
          {text}
        </div>
      </button>
    </>
  )
}