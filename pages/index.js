import Image from "next/image";
import Link from "next/link";
import Head from 'next/head';
import AppContext from '../utils/AppContext';
import { useContext } from 'react';
import Hero from "../components/Hero";
import EpisodesTypes from "../components/EpisodesTypes";
import Testimonials from "../components/Testimonials";


export default function Home() {
  const {
    theme, setTheme, searchValue, setSearchValue,
  } = useContext(AppContext);

  return (
    <>

      <Head>
        <title>TALKIN AI Homepage</title>
        <meta name="description" content="Generate AI-enabled talking avatar and youtube videos!" />
        <link rel="icon" href="/talkin_logo.png" />
      </Head>


      <div className="max-w-7xl w-100 m-auto px-4">
        <Hero />
      </div>
      <EpisodesTypes />

      <Testimonials />
    </>

  );
}
