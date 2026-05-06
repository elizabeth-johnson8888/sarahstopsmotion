/**
 * Created by: Elizabeth Johnson
 * Date: 2026/05/06
 * 
 * Frame
 */
import { Image } from "../components/Image"
import viteLogo from '../assets/vite.svg'
import reactLogo from '../assets/react.svg'

export function ImageFrame ({ frame=viteLogo, frameHeight="h-52", picture=reactLogo, pictureHeight="w-1/2" }) {
    return (
        <div className="relative inline-block">
            <Image asset={frame} assetTitle="frame" height={frameHeight}/>

            {/* add '-z-1' if you want the picture to be below the frame */}
            <div className="absolute inset-0 flex items-center justify-center">
                <Image asset={picture} assetTitle="vite" height={pictureHeight}/>
            </div>
        </div>
    )
}