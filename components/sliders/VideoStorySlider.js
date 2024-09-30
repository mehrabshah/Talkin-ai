import Slider from "react-slick";
import { VideoSliderControl } from "./VideoSliderControl";

export const VideoStorySlider = ({
  gallery,
  width,
  height,
  setStoryPrediction,
  galleryImages,
  setNumInferenceSteps,
  setFps,
  setMotion,
  handleRegenerateVideo,
  setImageUrl,
  activeSlide,
  setActiveSlide,
}) => {
  const settings = {
    customPaging: function (i) {
      return (
        <a className="md:h-10 h-5 aspect-square block">
          <img
            src={galleryImages[i]}
            className="w-full h-full object-cover"
            alt="output"
          />
        </a>
      );
    },
    dots: true,
    dotsClass:
      "slick-dots slick-thumb md:-bottom-28 -bottom-20 !flex items-center justify-center ",
    infinite: gallery?.length > 3,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: false,
    beforeChange: (current, next) => {
      setActiveSlide(next);
      setImageUrl(galleryImages[next]);
    },
  };

  return (
    <>
      {gallery && gallery?.length != 0 && (
        <div className="slider-container  mt-5 max-w-full pb-20 video-slider-container min-h-0 min-w-0">
          <Slider {...settings}>
            {gallery?.map((video_src, index) => (
              <div key={"slider_item" + index}>
                <video
                  controls
                  muted
                  autoPlay
                  src={video_src}
                  className="w-full aspect-video"
                  alt="output"
                  loop
                  width={width}
                  height={height}
                />
              </div>
            ))}
          </Slider>
          <VideoSliderControl
            setStoryPrediction={setStoryPrediction}
            index={activeSlide}
            setMotion={setMotion}
            setFps={setFps}
            setNumInferenceSteps={setNumInferenceSteps}
            handleRegenerateVideo={handleRegenerateVideo}
          />
        </div>
      )}
    </>
  );
};
