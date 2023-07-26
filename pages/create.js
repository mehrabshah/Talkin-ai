import Head from "next/head";
//import { Roboto } from "@next/font/google";
import AvatarDashboard from "../components/AvatarDashboard";
import { Video, CloudinaryContext } from "cloudinary-react";
//import AvatarFAQ from '../components/AvatarFAQ';


//const roboto = Roboto({
//  subsets: ["latin"],
//  weight: ["100", "300", "400", "500", "700", "900"],
//});

export default function Home() {
  return (
    <>
      <Head>
        <title>TALKIN AI Talking Avatar Generator</title>
        <meta name="description" content="Create AI-enabled Talking Avatar" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">

       

        <div className="relative pt-20 ml-auto">
            <div className="lg:w-2/3 text-center mx-auto">
                <h1 className="text-white dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl">Talking Avatar<span className="text-primary dark:text-white"> Generator.</span></h1>
                <p className="mt-8 text-gray-700 dark:text-gray-300">Create Your Unique Talking Avatar in Seconds </p>
               
                
            </div>
        </div>



        <div className="state-card grid grid-cols-1 gap-6 py-2 place-items-center md:py-2 md:grid-cols-2">
          <div>
            <h2 className="text-center mx-4 my-4 text-xl text-white font-semibold md:text-left md:text-xl md: mx-2 my-4">
              Welcome! To generate a talking avatar, you need to:
              <p className="flex-1  flex flex-col items-left my-2">
                <li className="text-gray-600 font-bold text-left  text-sm">
                  First to upload your avatar image,

                </li>

                <li className="text-gray-600 text-left text-sm">

                  Then  to input your speech script, you can also use ChatGPT  to create a script,

                </li>
                <li className="text-gray-600 text-left text-sm">
                  Finally to choose a voice to clone,  you can choose from the list of given voices, or upload a custom voice and click the generate button.

                </li>
              </p>

            </h2>

          </div>

          <div>
            <div className="video-card flex justify-center items-center gap-3 m-auto mt-2 py-3 px-6">
              <CloudinaryContext cloud_name="dbospsdwo" secure>
                <div>
                  <Video
                    publicId="talking_avatar/fyykejcsy2l2ekwwemr8"
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

        <AvatarDashboard />
      </main>
    </>
  );
}
