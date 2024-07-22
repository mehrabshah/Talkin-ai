import Head from "next/head";
//import { Roboto } from "@next/font/google";
import { Video, CloudinaryContext } from "cloudinary-react";
import VideoDashboard from "../components/VideoDashboard";

//import TubeFAQ from "../components/TubeFAQ";
//const roboto = Roboto({
//  subsets: ["latin"],
//  weight: ["100", "300", "400", "500", "700", "900"],
//});

export default function Home() {
  return (
    <>
      <Head>
        <title>TALKIN AI Text2Tube - AI Video Generator</title>
        <meta name="description" content="AI enabled video generator" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/talkin_logo.png" />
       
      </Head>

      <main className="p-10 mx-auto max-w-4xl">

        <div className="relative pt-20 ml-auto">
            <div className="lg:w-3/4 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Text2Video<span className="text-primary dark:text-white"> Generator.</span></h1>
                <p className="mt-8 text-xl text-gray-700 dark:text-gray-300">Create Exciting Videos in Seconds</p>
               
                
            </div>
        </div>

       
        <VideoDashboard />
      </main>
    </>
  );
}
