
import { useRef } from "react";
import { Video, CloudinaryContext } from "cloudinary-react";

const VideoPlayer = () => {
  const videoRef = useRef();
  return (
    <CloudinaryContext cloud_name="dbospsdwo">
      <div>
        <Video
          publicId="tube_video/swwadhiy7gzfopqfyx2b"
          width="640"
          height="360"
          controls
          innerRef={videoRef}
        />
      </div>
    </CloudinaryContext>
  );
};

export default VideoPlayer;