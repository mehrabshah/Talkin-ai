import React from 'react';
import Link from 'next/link';
import VideoPlayer from './VideoPlayer';


// React Icons
import { BsFillPlayCircleFill } from 'react-icons/bs';

const Hero = () => {
    return (
        <div className="grid grid-cols-1 gap-6 py-10 place-items-center md:py-16 md:grid-cols-2">
            <div>
                <h1 className="header1 text-center text-4xl font-bold md:text-left md:text-5xl">
                    TALKIN AI
                </h1>
                <h2 className="text-center my-4 text-3xl text-white font-semibold md:text-left md:text-4xl md:my-4">
                    AI GENERATED YOUTUBE VIDEO & TALKING AVATAR
                </h2>
                <p className="text-center font-normal text-md text-light-gray my-6 mb-8 md:text-left md:text-xl leading-normal">
                </p>

                <Link href="/auth/signin"
                    title="Sign In"
                    className="hero-button flex justify-center items-center gap-3 w-max m-auto mt-8 py-3 px-6 text-sm text-white font-semibold rounded-full active:scale-95 md:text-md md:m-0">
                    <span className="text-xl md:text-2xl"><BsFillPlayCircleFill /></span>
                    <span>Make Your Own</span>
                </Link>

            </div>

            <div>
                <div classname="video-card flex justify-center items-center gap-3 m-auto mt-8 py-3 px-6">
                    <VideoPlayer />
                </div>
            </div>
        </div>
    )
}

export default Hero;