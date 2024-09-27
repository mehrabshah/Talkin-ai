import axios from "axios";

export const uploadImage = async ({ body }) => {
  try {
    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/dvdxxna6v/image/upload",
      body
    );
    console.log({ response });
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};
