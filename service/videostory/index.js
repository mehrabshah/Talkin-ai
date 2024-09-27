import axios from "axios";

export const generateStoryDescription = async ({ body }) => {
  try {
    const response = await axios.post("/api/returnStoryDescription", body);
    return response?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const generateVideoStory = async ({ body, id = "" }) => {
  try {
    const response = await axios.post("/api/video_story", body);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getGdeneratedVideoStory = async ({ id }) => {
  try {
    const response = await axios.get(`/api/video_story/${id}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
