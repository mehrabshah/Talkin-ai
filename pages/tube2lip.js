import Head from "next/head";
//import { Roboto } from "@next/font/google";
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
        <title>AI Video Script Generator</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="p-10 mx-auto max-w-4xl">

        <div className="topnav">
          <div>
            <h1 className="header1 text-2xl md:text-2xl font-bold">Tube2Lip Video Generator</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center px-4 py-2">

          <p className="mt-3 text-1xl text-white">
            Create Funny Youtube Video in Seconds
          </p>
        </div>
        <TubeDashboard />
      </main>
    </>
  );
}
