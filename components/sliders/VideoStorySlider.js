import React from "react";
import Slider from "react-slick";
import { VideoSliderControl } from "./VideoSliderControl";

export const VideoStorySlider = ({
  gallery,
  width,
  height,
  setStoryPrediction,
}) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a className="h-10 aspect-video block">
          <video
            muted
            src={gallery[i]}
            className="w-full aspect-video object-cover"
            alt="output"
          />
        </a>
      );
    },
    dots: true,
    dotsClass:
      "slick-dots slick-thumb -bottom-12 !flex items-center justify-center ",
    infinite: gallery?.length > 3,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      {gallery && gallery?.length != 0 && (
        <div className="slider-container relative mt-5">
          <Slider {...settings}>
            {gallery?.map((video_src, index) => (
              <div
                key={"slider_item" + index}
                className="!flex flex-col gap-2 items-center justify-center"
              >
                <video
                  muted
                  autoPlay
                  src={video_src}
                  className="w-full aspect-video"
                  alt="output"
                  loop
                />
                <VideoSliderControl
                  setStoryPrediction={setStoryPrediction}
                  index={index}
                />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};
