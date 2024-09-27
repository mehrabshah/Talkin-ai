import axios from "axios";

export const generateImageToVideo = async ({ body }) => {
  try {
    const response = await axios.post("/api/i2v_predictions", body);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGeneratedImageToVideo = async ({ id }) => {
  try {
    const response = await axios.get(`/api/i2v_predictions/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
