"use client";
import Head from "next/head";
import { Camera } from "../components/home/Camera";
import { ColorBlob } from "../components/home/colorBlob";
import { Consistency } from "../components/home/Consistency";
import { QualityVideos } from "../components/home/QualityVideos";
import { VideoSlider } from "../components/sliders/VideoSlider";
import { bannerLeftVideos, bannerRightVideos } from "../data/banner";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <Head>
<title>AIVIDOO Main</title>
<meta name="description" content="text to video ai, image to video ai, ai storyteller" />
<meta name="keywords" content="text to video ai,  image to video ai,  text to video ai free,  ai text to video, text to video generator, photo to video ai, ai video generator from text,  create video story AI,  " />
<meta name="author" content="AIVIDOO" />
<meta property="og:title" content="AIVIDOO Main Page" />
<meta property="og:description" content="text to video ai, image to video ai, ai storyteller" />
<meta property="og:image" content="/aividoo_logo.png" />
<meta property="og:url" content="https://www.aividoo.com" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="AIVIDOO Main Page" />
<meta name="twitter:description" content="text to video ai, image to video ai, ai storyteller" />
<meta name="twitter:image" content="/aividoo_logo.png" />
</Head>
    
    
    
    <main className="overflow-hidden max-w-screen">
      
      <section className="min-h-screen mb-10 sm:block hidden">
        

        <VideoSlider
          left_videos={bannerLeftVideos}
          right_videos={bannerRightVideos}
        />
      </section>
      <section className="sm:hidden block overflow-hidden py-5">
        <div className="flex items-center gap-5 flex-nowrap animate-slide_left ">
          {bannerLeftVideos?.map((video, index) => (
            <video
              key={index}
              loop
              playsInline
              autoPlay
              muted
              className=" h-[250px] aspect-video object-cover rounded-xl"
            >
              <source src={video?.src} type="video/mp4" />
            </video>
          ))}
        </div>
        <div className="flex items-center gap-5 flex-nowrap animate-slide_right mt-5">
          {bannerRightVideos?.map((video, index) => (
            <video
              key={index}
              loop
              playsInline
              autoPlay
              muted
              className=" h-[250px] aspect-video object-cover rounded-xl"
            >
              <source src={video?.src} type="video/mp4" />
            </video>
          ))}
        </div>
       
      </section>

      <ColorBlob
        heading={
          <>
            Elevate Your Narrative, <br />
            Revolutionize Your Production
          </>
        }
        description={
          <>
            {" "}
            AIVIDOO is redefining content creation and production planning with
            VideoStory, a suite of cutting-edge AI tools, designed to
            streamline video story generation while enhancing a wide range of industries and creative processes.
          </>
        }
      />
      <QualityVideos />
      <Consistency />
      <Camera />
    </main>
    </>
  );
}
