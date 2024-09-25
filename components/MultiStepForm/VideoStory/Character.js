import { Button, IconButton } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineCloudUpload } from "react-icons/md";

export const Character = ({
  characters,
  setCharacters,
  setActiveStep,
  handleImageChange,
  imageSrc,
  setImageSrc,
}) => {
  return (
    <>
      <h2 className="font-semibold mb-4">Character</h2>
      <textarea
        type="text"
        className="block w-full rounded-md bg-transparent border border-gray-400 shadow-sm focus:outline-none sm:text-sm px-4 py-2 placeholder-gray-400 my-2 text-white"
        rows={5}
        name="characters"
        placeholder="Bella, a girl with a slender frame, long auburn hair, and piercing green eyes"
        id="characters"
        value={characters}
        onChange={(e) => setCharacters(e.target.value)}
        required
      />
      <h2
        className="px-2 py-1 text-md text-white font-semibold mb-4"
        htmlFor="image"
      >
        Reference Image (Optional) {"   "}
        {"    "}
        <span className="text-sm text-red-500">(jpg/jpeg) </span>
        <span className="text-sm text-red-400">*</span>
      </h2>
      <div className=" relative h-64 max-h-full w-full border-2 border-dashed border-gray-400 rounded-md bg-transparent">
        {imageSrc ? (
          <>
            <div className="absolute inset-0 bg-gray-300 rounded-md m-5 flex items-center justify-center ">
              <img
                src={imageSrc}
                className="basis-1/2 h-auto w-48 my-5"
                accept="image/*"
              />
            </div>
            <IconButton
              className="absolute top-5 right-5"
              onClick={() => setImageSrc("")}
            >
              <AiOutlineCloseCircle />
            </IconButton>
          </>
        ) : (
          <>
            <input
              type="file"
              className=" flex rounded-md bg-transparent border opacity-0 border-gray-400 shadow-sm  sm:text-sm px-4 py-2 placeholder-white-500 text-white-900 absolute inset-0 w-full h-full"
              name="image"
              placeholder="Select Picture"
              onChange={handleImageChange}
            />
            <div className="flex flex-col items-center gap-3 justify-center h-full w-full">
              <MdOutlineCloudUpload className="text-5xl" />
              <p className="text-base">Upload Image</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button variant="outlined" onClick={() => setActiveStep(2)}>
          Back
        </Button>
        <Button
          variant="outlined"
          onClick={() => setActiveStep(4)}
          disabled={!characters?.length}
          className="disabled:bg-gray-600 disabled:!text-white"
        >
          Next
        </Button>
      </div>
    </>
  );
};
