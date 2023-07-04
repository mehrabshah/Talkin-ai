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


      <div className="max-w-7xl w-100 m-auto px-1">
        <AboutHero />

      </div>
      <AboutVideoPlayer />

    </>

  );
}
