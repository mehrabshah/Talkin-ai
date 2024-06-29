import React from 'react';
import Link from 'next/link';

import Text2VideoPlayer from './Text2VideoPlayer';
import Text2VideoPlayer_1 from './Text2VideoPlayer_1';
import Text2VideoPlayer_2 from './Text2VideoPlayer_2';
import Text2VideoPlayer_3 from './Text2VideoPlayer_3';
import Text2VideoPlayer_4 from './Text2VideoPlayer_4';
import Text2VideoPlayer_5 from './Text2VideoPlayer_5';
import Text2VideoPlayer_6 from './Text2VideoPlayer_6';
import Text2VideoPlayer_7 from './Text2VideoPlayer_7';
import Text2VideoPlayer_8 from './Text2VideoPlayer_8';

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
        className=" h-full w-full animate_top border border-black shadow-solid-3 rounded-lg p-7.5 xl:p-12.5 transition-all hover:shadow-solid-4  z-40"
      >
       
       
       <div className="max-w-7xl w-100 m-auto px-4">
       <h1 className="text-white dark:text-white font-bold text-4xl md:text-5xl xl:text-6xl">TEXT2VIDEO</h1>
               
               <h2 className="text-center my-4 text-3xl text-white font-semibold md:text-left md:text-3xl md:my-4">
               Synthesize videos in any style you can imagine using nothing but a text prompt. 
               </h2>
               
    
       </div>
       <div className="grid  grid-rows-2 grid-cols-4 gap-0 py-8 place-items-center md:py-10 md:grid-cols-1">
            
            
            <div className="video-card  flex justify-center items-center gap-0 mt-0 px-1">
               <Text2VideoPlayer_1 />
               <Text2VideoPlayer_3 />
               <Text2VideoPlayer_2 />
               <Text2VideoPlayer_4 />
           </div>
                    
           <div className="video-card  flex justify-center items-center gap-0 mt-0 px-1">
               <Text2VideoPlayer_5 />
               <Text2VideoPlayer_6 />
               <Text2VideoPlayer_7 />
               <Text2VideoPlayer_8 />
              
              
           </div>
           
       

       
        </div>

        </motion.div> 
    )
}

export default Hero;