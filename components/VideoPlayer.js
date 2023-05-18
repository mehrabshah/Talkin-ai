
import { useRef } from "react";
import { Video, CloudinaryContext } from "cloudinary-react";

const VideoPlayer = () => {
  const videoRef = useRef();
  return (
    <CloudinaryContext cloud_name="dbospsdwo">
      <div>
        <Video
          publicId="talking_avatar/vh6rcnjxyo3yubfpk5js"
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