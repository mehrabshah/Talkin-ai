
import { useRef } from "react";
import { Video, CloudinaryContext } from "cloudinary-react";

const AboutVideoPlayer = () => {
  const videoRef = useRef();
  return (
    <div className="feature-content bg-light-purple py-2 md:py-16">
      <div className="max-w-5xl w-100 m-auto px-4">
        <CloudinaryContext cloud_name="dbospsdwo">
          <div>
            <Video
              publicId="hero_video_ev2flp"
              width="1280"
              height="360"
              controls
              innerRef={videoRef}
            />
          </div>
        </CloudinaryContext>
      </div>
    </div>
  );
};

export default AboutVideoPlayer;