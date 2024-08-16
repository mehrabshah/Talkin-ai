import React from 'react';
import Link from 'next/link';
import AboutVideoPlayer from './AboutVideoPlayer';


// React Icons
import { BsFillPlayCircleFill } from 'react-icons/bs';

const AboutHero = () => {
    return (
        <div className="grid grid-cols-1 gap-1 py-10 place-items-center md:py-16 md:grid-cols-2">
            <div>
                <h1 className="header1 text-center text-5xl font-bold md:text-left md:text-6xl">
                    About
                </h1>



            </div>

            <div>
                <h2 className="text-center my-4 text-xl text-white font-semibold md:text-center md:text-xl md:my-4">
                    AIVIDOO  is an AI research and development company. Our mission is to enable our users to create engaging and entertaining services/products by utilizing the latest artificial intelligence (AI) technologies.
                </h2>
            </div>

        </div>



    )
}

export default AboutHero;