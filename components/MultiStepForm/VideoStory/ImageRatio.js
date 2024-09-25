import { Button } from "@mui/material";

export const ImageRatio = ({ setActiveStep, aspectRatio, setAspectRatio }) => {
  return (
    <>
      <h2 className="font-semibold mb-4">Image Aspect Ratio</h2>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
        <div
          className="p-2 rounded-md border-2 border-gray-400 cursor-pointer"
          onClick={() => setAspectRatio("16:9")}
        >
          <div
            className={`aspect-[16/9]  rounded-md flex items-center justify-center  ${
              aspectRatio === "16:9" ? "bg-gray-200" : "bg-gray-400"
            }`}
          >
            <span className="text-3xl text-black">16:9</span>
          </div>
        </div>
        <div
          className="p-2 rounded-md border-2 border-gray-400 flex items-center justify-center cursor-pointer"
          onClick={() => setAspectRatio("9:16")}
        >
          <div
            className={` rounded-md flex items-center justify-center h-full aspect-[9/16]  ${
              aspectRatio === "9:16" ? "bg-gray-200" : "bg-gray-400"
            }`}
          >
            <span className="text-3xl text-black">9:16</span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button variant="outlined" onClick={() => setActiveStep(1)}>
          Back
        </Button>
        <Button
          variant="outlined"
          onClick={() => setActiveStep(3)}
          disabled={!aspectRatio?.length}
          className="disabled:bg-gray-600 disabled:!text-white"
        >
          Next
        </Button>
      </div>
    </>
  );
};
