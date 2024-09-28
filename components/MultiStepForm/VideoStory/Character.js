import { Button, IconButton } from "@mui/material";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutlineCloudUpload } from "react-icons/md";
import { toast } from "react-toastify";
import { uploadImage } from "../../../service/upload";
import { isImage, validateImgSize } from "../../../utils/fileValidation";

export const Character = ({ setActiveStep, formik }) => {
  const handleImageChange = async (e) => {
    try {
      const image_formData = new FormData();
      const img = e?.target?.files[0];
      if (!img) {
        return;
      }

      // check if image
      const result = isImage(img?.name);
      if (!result) {
        const error = "File type should be a jpg/jpeg image";
        toast(error, { type: "error" });

        return;
      }
      const isImageLarge = validateImgSize(img);
      if (isImageLarge) {
        const error = "File must be less or equal to 1MB";
        toast(error, { type: "error" });

        return;
      }

      image_formData.append("file", e.target.files[0]);

      image_formData.append("upload_preset", "app_users");

      const image_data = await uploadImage({ body: image_formData });

      formik.setFieldValue("image_url", image_data?.url);
    } catch (error) {
      toast.error(error);
    }
  };

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
        {...formik?.getFieldProps("characters")}
        required
      />
      {formik?.touched?.characters && formik?.errors?.characters && (
        <span className="block text-sm text-red-500 font-light mt-2">
          {formik?.errors?.characters}
        </span>
      )}
      <h2
        className="px-2 py-1 text-md text-white font-semibold mb-4"
        htmlFor="image"
      >
        Reference Image (Optional) {"   "}
        {"    "}
        <span className="text-sm text-red-500">(jpg/jpeg) </span>
        <span className="text-sm text-red-400">*</span>
      </h2>
      <div className=" relative h-64  w-full border-2 border-dashed border-gray-400 rounded-md bg-transparent p-5 cursor-pointer">
        {formik?.values?.image_url ? (
          <>
            <div className="  bg-gray-300  rounded-md  flex items-center justify-center m-2 absolute inset-0 p-2">
              <img
                src={formik?.values?.image_url}
                className="aspect-video h-full rounded-md"
                accept="image/*"
              />
            </div>
            <IconButton
              className="!absolute top-5 right-5"
              onClick={() => formik?.setFieldValue("image_url", "")}
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
              title=""
            />
            <div className="flex flex-col items-center gap-3 justify-center h-full w-full">
              <MdOutlineCloudUpload className="text-5xl" />
              <p className="text-base">Upload Image</p>
            </div>
          </>
        )}
      </div>
      <div className="flex items-center justify-between mt-4">
        <Button
          variant="contained"
          className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
          onClick={() => setActiveStep(2)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          className="disabled:bg-gray-600 disabled:!text-white bg-[#5bbcff]"
          onClick={formik?.handleSubmit}
        >
          Next
        </Button>
      </div>
    </>
  );
};
