import React from 'react';
import Link from 'next/link';

import Text2VideoPlayer from './Text2VideoPlayer';

import { motion } from "framer-motion";


// React Icons
import { BsFillPlayCircleFill } from 'react-icons/bs';

const Hero = () => {
    return (
       
       
        
        <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: -10,
          },

          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className=" episode-card animate_top border border-white shadow-solid-3 rounded-lg p-7.5 xl:p-12.5 transition-all hover:shadow-solid-4  z-40"
      >
       
       <div className="grid grid-cols-1 gap-5 py-10 place-items-center md:py-16 md:grid-cols-2">
            
            <div  >
            <div className="video-card  flex justify-center items-center gap-3 m-auto mt-8 py-3 px-6">
               <Text2VideoPlayer />
           </div>
                    
          
       </div>

       <div>
       <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">TEXT2VIDEO</h1>
               
               <h2 className="text-center my-4 text-3xl text-white font-semibold md:text-left md:text-3xl md:my-4">
               Synthesize videos in any style you can imagine using nothing but a text prompt. 
               </h2>
               <p className="text-center font-normal text-md text-light-gray my-6 mb-8 md:text-left md:text-xl leading-normal">
               
               </p>
    
               <Link href="/sign-in"
                   title="Sign In"
                   className="hero-button flex justify-center items-center gap-3 w-max m-auto mt-8 py-3 px-6 text-sm text-white font-semibold rounded-full active:scale-95 md:text-md md:m-0">
                   <span className="text-xl md:text-2xl"><BsFillPlayCircleFill /></span>
                   <span>Make Your Own</span>
               </Link>
    
       </div>
        </div>

        </motion.div> 
    )
}

export default Hero;