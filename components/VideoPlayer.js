
import { useRef } from "react";
import { Video, CloudinaryContext } from "cloudinary-react";

const VideoPlayer = () => {
  const videoRef = useRef();
  return (
    <CloudinaryContext cloud_name="dbospsdwo" secure>
      <div className="herovideo-card">
        <Video
          //publicId="swwadhiy7gzfopqfyx2b"
          publicId="trump_rap_qgtuxz"
          width="900"
          height="600"
          controls
          loop
          innerRef={videoRef}
        />
      </div>
    </CloudinaryContext>
  );
};

export default VideoPlayer;