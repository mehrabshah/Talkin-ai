import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import AppContext from '../utils/AppContext';
import { useContext } from 'react';
import AboutHero from "../components/AboutHero";
import AboutVideoPlayer from "../components/AboutVideoPlayer";
import EpisodesTypes from "../components/EpisodesTypes";


export default function Home() {
  const {
    theme, setTheme, searchValue, setSearchValue,
  } = useContext(AppContext);

  return (
    <>

      <Head>
        <title>TALKIN AI About</title>
        <meta name="description" content="AI R&D Company" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>

      <div aria-hidden="true" class="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"></div>
        <div class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"></div>
    </div>
      <div className="max-w-7xl w-100 m-auto px-1">
        <AboutHero />

      </div>
      <AboutVideoPlayer />

    </>

  );
}
