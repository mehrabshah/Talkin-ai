
import { useRef } from "react";
import { Video, CloudinaryContext } from "cloudinary-react";

const VideoPlayer = () => {
  const videoRef = useRef();
  return (
    <CloudinaryContext cloud_name="dbospsdwo">
      <div className="herovideo-card">
        <Video
          //publicId="swwadhiy7gzfopqfyx2b"
          publicId="trump_rap_qgtuxz"
          width="640"
          height="360"
          controls
          loop
          innerRef={videoRef}
        />
      </div>
    </CloudinaryContext>
  );
};

export default VideoPlayer;