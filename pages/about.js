import Head from 'next/head';
import AboutHero from "../components/AboutHero";
import AboutVideoPlayer from "../components/AboutVideoPlayer";



export default function Home() {
  
  return (
    <>

      <Head>
        <title>TALKIN AI About</title>
        <meta name="description" content="AI R&D Company" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>

      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-30 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div className="blur-[106px] h-20 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
      <div className="max-w-7xl w-100 m-auto px-1">
        <AboutHero />

      </div>
      <AboutVideoPlayer />

    </>

  );
}
