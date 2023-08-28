// pages/pricing.js

import React from 'react';

import Image from "next/image";
import { motion } from "framer-motion";

import Link from 'next/link';

import { BsFillPlayCircleFill } from 'react-icons/bs';

export default function NewUserTrial() {
  
    
  return (
    <section className="z-10 py-20 lg:py-25 xl:py-30 px-4 md:px-8 2xl:px-0 overflow-hidden">
        <div className="mx-auto max-w-c-1390 px-7.5 md:px-12.5 xl:px-17.5 py-12.5 xl:py-0 rounded-lg bg-gradient-to-t from-[#008080] to-[#000000]">
          <div className="flex flex-wrap md:flex-nowrap md:items-center md:justify-center gap-8 md:gap-0">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: -20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 10, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-[70%] lg:w-1/2"
            >
              <h2 className="text-white dark:text-white text-3xl xl:text-sectiontitle4 font-bold mb-8 mx-10 w-11/12">
                Start New User Trial Today
              </h2>
            </motion.div>
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  x: 20,
                },

                visible: {
                  opacity: 1,
                  x: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 10, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right lg:w-[45%]"
            >
              <div className="flex items-center justify-end xl:justify-center">
                <Image
                  width={299}
                  height={299}
                  src="/new_user.svg"
                  alt="Saly"
                  className="hidden xl:block"
                />
                
               
                
                <Link
                  href="/create"
                  className="hero-button flex justify-center items-center gap-3 w-max m-auto mt-8 py-3 px-6 text-sm text-white font-semibold rounded-full active:scale-95 md:text-md md:m-0">
                    <span className="text-xl md:text-2xl"><BsFillPlayCircleFill /></span>
                    <span>Try For Free</span>
                 
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    
    
  )
}
















