/**
 * Created by: Elizabeth Johnson
 * Date: 2026/05/06
 * 
 * Frame
 */
import { Image } from "../components/Image"
import viteLogo from '../assets/vite.svg'
import reactLogo from '../assets/react.svg'

export function ImageFrame ({ frame=viteLogo, 
                              frameClassName="h-52", 
                              picture=reactLogo, 
                              pictureAlt="vite", 
                              pictureClassName="w-1/2", 
                              z_score="" }) {
    return (
        <div className="relative inline-block">
            <Image asset={frame} 
                   assetTitle="frame" 
                   className={frameClassName}/>

            {/* add '-z-1' if you want the picture to be below the frame */}
            <div className={`absolute inset-0 flex items-center justify-center ${z_score}`}>
                <Image asset={picture} 
                       assetTitle={pictureAlt} 
                       className={pictureClassName}/>
            </div>
        </div>
    )
}

export function TVFrame ({ frame=reactLogo, 
                              frameClassName="h-80", 
                              VideoPlayer, 
                              z_score="" }) {
    return (
        <div className="relative block leading-none">
            <Image asset={frame} 
                   assetTitle="frame" 
                   className={`block ${frameClassName}`}/>

            {/* add '-z-1' if you want the picture to be below the frame */}
            <div className={`absolute inset-0 flex items-center justify-center px-5 ${z_score}`}>
                {VideoPlayer}
            </div>
        </div>
    )
}