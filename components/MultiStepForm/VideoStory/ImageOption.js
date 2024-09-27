import { Button } from "@mui/material";
import Image from "next/image";
import { ImageStyle } from "../../../data/style";

export const ImageOption = ({ formik }) => {
  return (
    <>
      <h2 className="font-semibold mb-4">Image Style</h2>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3">
        {ImageStyle?.map((style, i) => (
          <div
            className={`rounded-md flex items-center gap-3 flex-col border-2 cursor-pointer px-2 py-3 ${
              formik?.values?.style_name === style?.value
                ? "border-gray-200 bg-gray-200 text-black"
                : "border-gray-400 bg-transparent text-white"
            }`}
            key={style?.title + i}
            onClick={() => formik?.setFieldValue("style_name", style?.value)}
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
      {formik?.touched?.style_name && formik?.errors?.style_name && (
        <span className="block text-sm text-red-500 font-light mt-2">
          {formik?.errors?.style_name}
        </span>
      )}
      <div className="flex items-center justify-end mt-4">
        <Button
          variant="contained"
          onClick={formik?.handleSubmit}
          className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
        >
          Next
        </Button>
      </div>
    </>
  );
};
