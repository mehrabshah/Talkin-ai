

import { Video, CloudinaryContext } from "cloudinary-react";

const Text2VideoPlayer_8 = () => {
 
  return (
    <CloudinaryContext cloud_name="dbospsdwo" secure>
      <div className="herovideo-card">
        <Video
          publicId="talking_avatar/victoria_pigeon_ghxfrl"
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

export default Text2VideoPlayer_8;