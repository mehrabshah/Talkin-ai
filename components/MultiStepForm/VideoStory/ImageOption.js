import { Button } from "@mui/material";
import Image from "next/image";
import { ImageStyle } from "../../../data/style";

export const ImageOption = ({ value, setStyle, setActiveStep }) => {
  return (
    <>
      <h2 className="font-semibold mb-4">Image Style</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {ImageStyle?.map((style, i) => (
          <div
            className={`rounded-md flex items-center gap-3 flex-col border-2 cursor-pointer px-2 py-3 ${
              value === style?.value
                ? "border-gray-200 bg-gray-200 text-black"
                : "border-gray-400 bg-transparent text-white"
            }`}
            key={style?.title + i}
            onClick={() => setStyle(style?.value)}
          >
            <Image
              src={style?.image}
              alt={style?.title}
              width={500}
              height={500}
              className="w-full aspect-square rounded-md"
            />
            <p className="text-sm">{style?.title}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end mt-4">
        <Button
          variant="outlined"
          onClick={() => setActiveStep(2)}
          disabled={!value?.length}
          className="disabled:bg-gray-600 disabled:!text-white"
        >
          Next
        </Button>
      </div>
    </>
  );
};
