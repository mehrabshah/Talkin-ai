"use client";
import { Camera } from "../components/home/Camera";
import { ColorBlob } from "../components/home/colorBlob";
import { Consistency } from "../components/home/Consistency";
import { QualityVideos } from "../components/home/QualityVideos";
import { VideoSlider } from "../components/sliders/VideoSlider";
import { bannerLeftVideos, bannerRightVideos } from "../data/banner";
import Image from "next/image";

export default function Home() {
  return (
    <main className="overflow-hidden max-w-screen">
      
      <div className="inset-0 grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20">
        <div className="blur-[106px] h-20 bg-gradient-to-r from-yellow-400 to-orange-600 dark:to-indigo-600"></div>
        <div className="blur-[106px] h-30 bg-gradient-to-r from-orange-600 to-red-400 dark:from-red-700"></div>
        </div>
      
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
        <div className="flex items-center py-5 justify-center relative -top-10">
          <Image
            src="/assets/images/logo.avif"
            alt="logo"
            width={500}
            height={500}
            className="max-w-[250px] "
          />
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
            StoryboardVision, a suite of cutting-edge AI tools, designed to
            streamline video and image generation while enhancing both education
            and pre-production process.
          </>
        }
      />
      <QualityVideos />
      <Consistency />
      <Camera />
    </main>
  );
}
