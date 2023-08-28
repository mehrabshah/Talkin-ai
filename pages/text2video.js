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
            <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Text2Video<span className="text-primary dark:text-white"> Generator.</span></h1>
                <p className="mt-8 text-xl text-gray-700 dark:text-gray-300">Create Exciting Videos in Seconds</p>
               
                
            </div>
        </div>

        <div className="state-card grid grid-cols-1 gap-6 py-2 place-items-center md:py-2 md:grid-cols-2">
          <div>
            <h2 className="text-center px-4 py-4 text-xl text-white font-semibold md:text-left md:text-xl md:px-4 py-4">
              Welcome! To make a youtube video, you need to:
              <p className="flex-1  px-2 py-4 flex flex-col items-left">
                <li className="text-gray-600 font-bold text-left  text-sm">
                  First to input the text prompt, optionally you can also input negative prompt which you don't want to see, e.g., half body.


                </li>

                <li className="text-gray-600 text-left text-sm">
                  Then to input video length in seconds (Optimally less than 60 sesonds).



                </li>
                <li className="text-gray-600 text-left text-sm">
                  Finally to click the generate button.


                </li>
              </p>

            </h2>

          </div>

          <div>
            <div className="video-card flex justify-center items-center gap-3 m-auto mt-2 py-3 px-6">
              <CloudinaryContext cloud_name="dbospsdwo" secure>
                <div>
                  <Video
                    publicId="tube_video/ulzbclqx6ext3geowzzy"
                    width="512"
                    height="512"
                    autoPlay
                    loop
                    controlsList="nodownload"
                  />
                </div>
              </CloudinaryContext>
            </div>
          </div>
        </div>
        <VideoDashboard />
      </main>
    </>
  );
}
