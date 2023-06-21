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
        <title>Talking Avatar About</title>
        <meta name="description" content="A simple Next.js application that utilizes Replicate to restore old photos." />
      </Head>


      <div className="max-w-7xl w-100 m-auto px-1">
        <AboutHero />

      </div>
      <AboutVideoPlayer />

    </>

  );
}
