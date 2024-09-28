import * as Yup from "yup";

export const characterSchema = Yup.object({
  characters: Yup.string().required("Character's description is required."),
  image_url: Yup.string(),
});

export const storySchema = Yup.object({
  storyDescription: Yup.string().required("Story Description is required."),
});

export const ideaSchema = Yup.object({
  idea: Yup.string().required("Story idea  is required."),
  numPanels: Yup.string().required("Number of panels are required."),
});

export const ratioSchema = Yup.object({
  aspectRatio: Yup.string().required("Aspect Ratio is required."),
});

export const styleSchema = Yup.object({
  style_name: Yup.string(),
});
