
import Link from "next/link";
import Meta from "../components/Meta";
import Head from 'next/head';
import Hero from "../components/Hero";
import Text2VideoHero from "../components/Text2VideoHero";
import Features from "../components/Features";
import NewUserTrialHero from "../components/NewUserTrialHero";

import Testimonials from "../components/Testimonials";



export default function Home() {
  
  return (
    <>
     <Meta />
      

      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
      <div className="max-w-7xl w-100 m-auto px-4">
        <Hero />
        <Text2VideoHero />
      </div>
      <NewUserTrialHero />
      <Features />

      
      <Testimonials />
    </>

  );
}
