import Wrapped from "../hoc/Wrapped";

export const QualityVideos = () => {
  return (
    <section className=" pt-32 pb-8">
      <div className="container lg:max-w-[1024px] mx-auto text-white md:block hidden">
        <Wrapped>
          <div className="grid grid-cols-2 gap-4 items-center ">
            <h2 className="text-5xl">
              Transform Text into Seamless Video Storyboards
            </h2>
            <video
              playsInline
              autoPlay
              muted
              className="rounded-2xl size-full"
              loop
              preload="none"
            >
              <source
                src={`https://gist.github.com/user-attachments/assets/3064a6e6-d85a-4ca7-b05e-d294d121d7a5`}
                type="video/mp4"
              />
              <track
                src={`/assets/videos/harry_pic_1.mp4`}
                kind="subtitles"
                srcLang="en"
                label="English"
              />
            </video>
          </div>
        </Wrapped>
        <Wrapped>
          <div className="grid grid-cols-7 items-center gap-4 my-4">
            <video
              playsInline
              autoPlay
              muted
              loop
              className="col-span-4 rounded-2xl size-full"
            >
              <source
                src="https://gist.github.com/user-attachments/assets/3ee2f728-0273-426d-9a30-85d98763c66e"
                type="video/mp4"
              />
            </video>
            <video
              playsInline
              autoPlay
              muted
              loop
              className="rounded-2xl size-full col-span-3 object-cover"
            >
              <source
                src="https://gist.github.com/user-attachments/assets/26a487ed-dd48-4723-8861-83fdd7d10654"
                type="video/mp4"
              />
            </video>
          </div>
        </Wrapped>
        <Wrapped>
          <div className="grid grid-cols-5 items-start gap-4 lg:max-w-[800px] w-full lg:mx-auto">
            <video
              playsInline
              autoPlay
              muted
              loop
              className=" rounded-2xl object-cover col-span-2"
            >
              <source
                src="https://gist.github.com/user-attachments/assets/1fd69891-1452-4f7d-af61-fd9318bd7932"
                type="video/mp4"
              />
            </video>
            <video
              playsInline
              autoPlay
              muted
              loop
              className="rounded-2xl object-cover  col-span-3"
            >
              <source
                src="https://gist.github.com/user-attachments/assets/656960e1-3fb1-49d2-9756-0e4a6b8ce3a5"
                type="video/mp4"
              />
            </video>
          </div>
        </Wrapped>
      </div>
      <div className="max-w-full  md:hidden block mx-auto ">
        <Wrapped>
          <h2 className="text-4xl mb-10 text-center text-white sm:w-2/4 sm:mx-auto px-5">
            Transform Text into Seamless Video Storyboards
          </h2>
        </Wrapped>
        <Wrapped>
          <div className="flex items-center flex-nowrap gap-5 overflow-x-auto px-5">
            <video
              playsInline
              autoPlay
              muted
              className="rounded-2xl size-full h-[300px] aspect-video object-cover"
              loop
            >
              <source
                src="https://gist.github.com/user-attachments/assets/3064a6e6-d85a-4ca7-b05e-d294d121d7a5"
                type="video/mp4"
              />
            </video>
            <video
              playsInline
              autoPlay
              muted
              className="rounded-2xl size-full h-[300px] aspect-video object-cover"
              loop
            >
              <source
                src="https://gist.github.com/user-attachments/assets/3ee2f728-0273-426d-9a30-85d98763c66e"
                type="video/mp4"
              />
            </video>
            <video
              playsInline
              autoPlay
              muted
              loop
              className="col-span-4 rounded-2xl size-full h-[300px] aspect-video object-cover"
            >
              <source
                src="https://gist.github.com/user-attachments/assets/26a487ed-dd48-4723-8861-83fdd7d10654"
                type="video/mp4"
              />
            </video>
            <video
              playsInline
              autoPlay
              muted
              loop
              className="col-span-4 rounded-2xl size-full h-[300px] aspect-video object-cover"
            >
              <source
                src="https://gist.github.com/user-attachments/assets/1fd69891-1452-4f7d-af61-fd9318bd7932"
                type="video/mp4"
              />
            </video>
            <video
              playsInline
              autoPlay
              muted
              loop
              className="col-span-4 rounded-2xl size-full h-[300px] aspect-video object-cover"
            >
              <source
                src="https://gist.github.com/user-attachments/assets/656960e1-3fb1-49d2-9756-0e4a6b8ce3a5"
                type="video/mp4"
              />
            </video>
          </div>
        </Wrapped>
      </div>
    </section>
  );
};
