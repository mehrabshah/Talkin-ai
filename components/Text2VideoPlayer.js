

import { Video, CloudinaryContext } from "cloudinary-react";

const Text2VideoPlayer = () => {
 
  return (
    <CloudinaryContext cloud_name="dbospsdwo" secure>
      <div className="herovideo-card">
        <Video
          publicId="tube_video/ulzbclqx6ext3geowzzy"
          //publicId="trump_rap_qgtuxz"
          autoPlay
          loop
          muted
          width="600"
          height="400"
          controlsList="nodownload"
        
        />
      </div>
    </CloudinaryContext>
  );
};

export default Text2VideoPlayer;