import Head from "next/head";
//import { Roboto } from "@next/font/google";
import { Video, CloudinaryContext } from "cloudinary-react";
import TubeDashboard from "../components/TubeDashboard";

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

        <div class="relative pt-20 ml-auto">
            <div class="lg:w-2/3 text-center mx-auto">
                <h1 class="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Text2Tube<span class="text-primary dark:text-white"> Video Generator.</span></h1>
                <p class="mt-8 text-gray-700 dark:text-gray-300">Create Funny Youtube Video in Seconds</p>
               
                
            </div>
        </div>

        <div className="state-card grid grid-cols-1 gap-6 py-2 place-items-center md:py-2 md:grid-cols-2">
          <div>
            <h2 className="text-center mx-4 my-4 text-xl text-white font-semibold md:text-left md:text-xl md:mx-2 my-4">
              Welcome! To make a youtube video, you need to:
              <p className="flex-1  my-2 flex flex-col items-left">
                <li className="text-gray-600 font-bold text-left  text-sm">
                  First to input the youtube video url,


                </li>

                <li className="text-gray-600 text-left text-sm">
                  Then to input your speech script, you can also use ChatGPT to create a script,



                </li>
                <li className="text-gray-600 text-left text-sm">
                  Finally to choose the start time of video and the end time of the video where you would like to match the speech and click the generate button.


                </li>
              </p>

            </h2>

          </div>

          <div>
            <div className="video-card flex justify-center items-center gap-3 m-auto mt-2 py-3 px-6">
              <CloudinaryContext cloud_name="dbospsdwo">
                <div>
                  <Video
                    publicId="talking_avatar/rgupcw6itclxsh5cuzee"
                    width="512"
                    height="512"
                    controls
                    disablePictureInPicture
                  />
                </div>
              </CloudinaryContext>
            </div>
          </div>
        </div>
        <TubeDashboard />
      </main>
    </>
  );
}
