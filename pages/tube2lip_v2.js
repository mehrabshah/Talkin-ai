import Head from "next/head";
//import { Roboto } from "@next/font/google";
import { Video, CloudinaryContext } from "cloudinary-react";
import TubeDashboardV2 from "../components/TubeDashboardV2";

//import TubeFAQ from "../components/TubeFAQ";
//const roboto = Roboto({
//  subsets: ["latin"],
//  weight: ["100", "300", "400", "500", "700", "900"],
//});

export default function Home() {
  return (
    <>
      <Head>
        <title>AI Video Script Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">

        <div className="topnav">
          <div>
            <h1 className="header1 text-2xl md:text-2xl font-bold">Tube2Tube Video Generator</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-4 py-2">

          <p className="mt-3 text-1xl text-white">
            Create Funny Youtube Video in Seconds
          </p>
        </div>

        <div className="state-card grid grid-cols-1 gap-6 py-2 place-items-center md:py-2 md:grid-cols-2">
          <div>
            <h2 className="text-center mx-2 my-4 text-xl text-white font-semibold md:text-left md:text-xl md:mx-2 my-4">
              Welcome! To make a youtube video, you need to:
              <p className="flex-1  my-2 flex flex-col items-left">
                <li className="text-gray-600 font-bold text-left  text-sm">
                First to input the youtube video url for video, and input the start time of the video and the end time of the video where you would like to match the audio, 
                </li>

                <li className="text-gray-600 text-left text-sm">
                Next to input the youtube video url for audio, and input the start time of the video and the end time of the video where you would like to extract the audio, 



                </li>
                <li className="text-gray-600 text-left text-sm">
                  Finally to click the generate button.


                </li>
              </p>

            </h2>

          </div>

          <div>
            <div classname="video-card flex justify-center items-center gap-3 m-auto mt-8 py-3 px-6">
              <CloudinaryContext cloud_name="dbospsdwo">
                <div>
                  <Video
                    publicId="talking_avatar/evzfcehy7yey9vj6au2e"
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
        <TubeDashboardV2 />
      </main>
    </>
  );
}
