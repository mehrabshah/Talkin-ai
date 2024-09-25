import { useUser } from "@clerk/nextjs";
import { useContext, useEffect, useMemo, useState } from "react";
import { isImage, validateImgSize } from "../utils/fileValidation";
//import FAQ from './FAQ';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SubscriptionContext from "../context/SubscriptionContext";
import Disclaimer from "./Disclaimer";
import StoryBoardFAQ from "./StoryBoardFAQ";
//import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Character } from "./MultiStepForm/VideoStory/Character";
import { Description } from "./MultiStepForm/VideoStory/Description";
import { ImageOption } from "./MultiStepForm/VideoStory/ImageOption";
import { ImageRatio } from "./MultiStepForm/VideoStory/ImageRatio";
import { StoryIdea } from "./MultiStepForm/VideoStory/StoryIdea";
import { VideoStorySlider } from "./sliders/VideoStorySlider";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function Dashboard() {
  const [age, setAge] = useState("");
  const [events, setEvents] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [storyPrediction, setStoryPrediction] = useState({
    id: "e68wftq58srgp0cj56wsn4cy7c",
    model: "talkin-ai/t2v_story",
    version: "e8146cf5a7566178c853b51d63407e2cec5efdadfb723f34d877d86b04891601",
    input: {
      aspect_ratio: "9:16",
      character_description: "a girl with curly black hair",
      num_ids: 3,
      story_description:
        "The girl with curly black hair strolls down a cobblestone street, vibrant flowers lining her path.  \n\nShe pauses at a bustling marketplace, enchanted by the colorful stalls and lively chatter around her.  \n\nAs she wanders into a shadowy forest, sunlight filters through the leaves, creating a magical glow.  \n\nFinally, she reaches a shimmering lake, where her reflection dances with the rippling water's surface.",
      style_name: "Line art",
      video_height: 1080,
      video_width: 608,
    },
    logs: "['The girl with curly black hair strolls down a cobblestone street, vibrant flowers lining her path.  ', '', 'She pauses at a bustling marketplace, enchanted by the colorful stalls and lively chatter around her.  ', '', 'As she wanders into a shadowy forest, sunlight filters through the leaves, creating a magical glow.  ', '', \"Finally, she reaches a shimmering lake, where her reflection dances with the rippling water's surface.\"]\n['a girl with curly black hair,The girl with curly black hair strolls down a cobblestone street, vibrant flowers lining her path.  ', 'a girl with curly black hair,', 'a girl with curly black hair,She pauses at a bustling marketplace, enchanted by the colorful stalls and lively chatter around her.  ', 'a girl with curly black hair,', 'a girl with curly black hair,As she wanders into a shadowy forest, sunlight filters through the leaves, creating a magical glow.  ', 'a girl with curly black hair,', \"a girl with curly black hair,Finally, she reaches a shimmering lake, where her reflection dances with the rippling water's surface.\"]\n['a girl with curly black hair,The girl with curly black hair strolls down a cobblestone street, vibrant flowers lining her path.', 'a girl with curly black hair,', 'a girl with curly black hair,She pauses at a bustling marketplace, enchanted by the colorful stalls and lively chatter around her.', 'a girl with curly black hair,', 'a girl with curly black hair,As she wanders into a shadowy forest, sunlight filters through the leaves, creating a magical glow.', 'a girl with curly black hair,', \"a girl with curly black hair,Finally, she reaches a shimmering lake, where her reflection dances with the rippling water's surface.\"]\nUsing seed: 2149\nSuccessfully load paired self-attention\nNumber of the processor : 36\n  0%|          | 0/25 [00:00<?, ?it/s]\n  4%|▍         | 1/25 [00:01<00:25,  1.05s/it]\n  8%|▊         | 2/25 [00:01<00:19,  1.19it/s]\n 12%|█▏        | 3/25 [00:02<00:13,  1.68it/s]\n 16%|█▌        | 4/25 [00:02<00:11,  1.91it/s]\n 20%|██        | 5/25 [00:02<00:08,  2.24it/s]\n 24%|██▍       | 6/25 [00:03<00:07,  2.45it/s]\n 28%|██▊       | 7/25 [00:03<00:07,  2.50it/s]\n 32%|███▏      | 8/25 [00:04<00:08,  1.96it/s]\n 36%|███▌      | 9/25 [00:04<00:07,  2.20it/s]\n 40%|████      | 10/25 [00:04<00:06,  2.37it/s]\n 44%|████▍     | 11/25 [00:05<00:05,  2.51it/s]\n 48%|████▊     | 12/25 [00:05<00:06,  2.05it/s]\n 52%|█████▏    | 13/25 [00:06<00:05,  2.25it/s]\n 56%|█████▌    | 14/25 [00:06<00:04,  2.42it/s]\n 60%|██████    | 15/25 [00:06<00:03,  2.53it/s]\n 64%|██████▍   | 16/25 [00:07<00:03,  2.62it/s]\n 68%|██████▊   | 17/25 [00:07<00:02,  2.69it/s]\n 72%|███████▏  | 18/25 [00:08<00:02,  2.77it/s]\n 76%|███████▌  | 19/25 [00:08<00:02,  2.63it/s]\n 80%|████████  | 20/25 [00:08<00:01,  2.69it/s]\n 84%|████████▍ | 21/25 [00:09<00:01,  2.71it/s]\n 88%|████████▊ | 22/25 [00:09<00:01,  2.74it/s]\n 92%|█████████▏| 23/25 [00:10<00:00,  2.22it/s]\n 96%|█████████▌| 24/25 [00:10<00:00,  2.36it/s]\n100%|██████████| 25/25 [00:10<00:00,  2.49it/s]\n100%|██████████| 25/25 [00:10<00:00,  2.30it/s]\n  0%|          | 0/25 [00:00<?, ?it/s]\n  4%|▍         | 1/25 [00:00<00:03,  6.29it/s]\n  8%|▊         | 2/25 [00:00<00:03,  6.75it/s]\n 12%|█▏        | 3/25 [00:00<00:03,  6.90it/s]\n 16%|█▌        | 4/25 [00:00<00:03,  6.98it/s]\n 20%|██        | 5/25 [00:00<00:02,  7.02it/s]\n 24%|██▍       | 6/25 [00:00<00:02,  7.06it/s]\n 28%|██▊       | 7/25 [00:01<00:02,  7.03it/s]\n 32%|███▏      | 8/25 [00:01<00:02,  7.04it/s]\n 36%|███▌      | 9/25 [00:01<00:02,  6.90it/s]\n 40%|████      | 10/25 [00:01<00:02,  6.78it/s]\n 44%|████▍     | 11/25 [00:01<00:02,  6.83it/s]\n 48%|████▊     | 12/25 [00:01<00:01,  6.87it/s]\n 52%|█████▏    | 13/25 [00:01<00:01,  6.85it/s]\n 56%|█████▌    | 14/25 [00:02<00:01,  6.92it/s]\n 60%|██████    | 15/25 [00:02<00:01,  6.83it/s]\n 64%|██████▍   | 16/25 [00:02<00:01,  6.77it/s]\n 68%|██████▊   | 17/25 [00:02<00:01,  6.73it/s]\n 72%|███████▏  | 18/25 [00:02<00:01,  6.67it/s]\n 76%|███████▌  | 19/25 [00:02<00:00,  6.64it/s]\n 80%|████████  | 20/25 [00:02<00:00,  6.58it/s]\n 84%|████████▍ | 21/25 [00:03<00:00,  6.59it/s]\n 88%|████████▊ | 22/25 [00:03<00:00,  6.51it/s]\n 92%|█████████▏| 23/25 [00:03<00:00,  6.54it/s]\n 96%|█████████▌| 24/25 [00:03<00:00,  6.51it/s]\n100%|██████████| 25/25 [00:03<00:00,  6.47it/s]\n100%|██████████| 25/25 [00:03<00:00,  6.73it/s]\n  0%|          | 0/25 [00:00<?, ?it/s]\n  4%|▍         | 1/25 [00:00<00:03,  7.16it/s]\n  8%|▊         | 2/25 [00:00<00:03,  7.13it/s]\n 12%|█▏        | 3/25 [00:00<00:03,  7.12it/s]\n 16%|█▌        | 4/25 [00:00<00:02,  7.11it/s]\n 20%|██        | 5/25 [00:00<00:02,  7.11it/s]\n 24%|██▍       | 6/25 [00:00<00:02,  6.87it/s]\n 28%|██▊       | 7/25 [00:00<00:02,  6.93it/s]\n 32%|███▏      | 8/25 [00:01<00:02,  6.97it/s]\n 36%|███▌      | 9/25 [00:01<00:02,  6.98it/s]\n 40%|████      | 10/25 [00:01<00:02,  6.89it/s]\n 44%|████▍     | 11/25 [00:01<00:02,  6.89it/s]\n 48%|████▊     | 12/25 [00:01<00:01,  6.77it/s]\n 52%|█████▏    | 13/25 [00:01<00:01,  6.79it/s]\n 56%|█████▌    | 14/25 [00:02<00:01,  6.81it/s]\n 60%|██████    | 15/25 [00:02<00:01,  6.80it/s]\n 64%|██████▍   | 16/25 [00:02<00:01,  6.79it/s]\n 68%|██████▊   | 17/25 [00:02<00:01,  6.68it/s]\n 72%|███████▏  | 18/25 [00:02<00:01,  6.68it/s]\n 76%|███████▌  | 19/25 [00:02<00:00,  6.71it/s]\n 80%|████████  | 20/25 [00:02<00:00,  6.77it/s]\n 84%|████████▍ | 21/25 [00:03<00:00,  6.80it/s]\n 88%|████████▊ | 22/25 [00:03<00:00,  6.66it/s]\n 92%|█████████▏| 23/25 [00:03<00:00,  6.60it/s]\n 96%|█████████▌| 24/25 [00:03<00:00,  6.53it/s]\n100%|██████████| 25/25 [00:03<00:00,  6.48it/s]\n100%|██████████| 25/25 [00:03<00:00,  6.78it/s]\n  0%|          | 0/25 [00:00<?, ?it/s]\n  4%|▍         | 1/25 [00:00<00:03,  7.14it/s]\n  8%|▊         | 2/25 [00:00<00:03,  7.12it/s]\n 12%|█▏        | 3/25 [00:00<00:03,  7.11it/s]\n 16%|█▌        | 4/25 [00:00<00:02,  7.12it/s]\n 20%|██        | 5/25 [00:00<00:02,  7.11it/s]\n 24%|██▍       | 6/25 [00:00<00:02,  6.97it/s]\n 28%|██▊       | 7/25 [00:01<00:02,  6.76it/s]\n 32%|███▏      | 8/25 [00:01<00:02,  6.78it/s]\n 36%|███▌      | 9/25 [00:01<00:02,  6.70it/s]\n 40%|████      | 10/25 [00:01<00:02,  6.79it/s]\n 44%|████▍     | 11/25 [00:01<00:02,  6.87it/s]\n 48%|████▊     | 12/25 [00:01<00:01,  6.78it/s]\n 52%|█████▏    | 13/25 [00:01<00:01,  6.77it/s]\n 56%|█████▌    | 14/25 [00:02<00:01,  6.79it/s]\n 60%|██████    | 15/25 [00:02<00:01,  6.73it/s]\n 64%|██████▍   | 16/25 [00:02<00:01,  6.68it/s]\n 68%|██████▊   | 17/25 [00:02<00:01,  6.66it/s]\n 72%|███████▏  | 18/25 [00:02<00:01,  6.67it/s]\n 76%|███████▌  | 19/25 [00:02<00:00,  6.76it/s]\n 80%|████████  | 20/25 [00:02<00:00,  6.77it/s]\n 84%|████████▍ | 21/25 [00:03<00:00,  6.71it/s]\n 88%|████████▊ | 22/25 [00:03<00:00,  6.62it/s]\n 92%|█████████▏| 23/25 [00:03<00:00,  6.54it/s]\n 96%|█████████▌| 24/25 [00:03<00:00,  6.53it/s]\n100%|██████████| 25/25 [00:03<00:00,  6.45it/s]\n100%|██████████| 25/25 [00:03<00:00,  6.73it/s]\n  0%|          | 0/25 [00:00<?, ?it/s]\n  4%|▍         | 1/25 [00:00<00:03,  7.15it/s]\n  8%|▊         | 2/25 [00:00<00:03,  7.12it/s]\n 12%|█▏        | 3/25 [00:00<00:03,  7.11it/s]\n 16%|█▌        | 4/25 [00:00<00:02,  7.12it/s]\n 20%|██        | 5/25 [00:00<00:02,  7.11it/s]\n 24%|██▍       | 6/25 [00:00<00:02,  6.91it/s]\n 28%|██▊       | 7/25 [00:01<00:02,  6.87it/s]\n 32%|███▏      | 8/25 [00:01<00:02,  6.85it/s]\n 36%|███▌      | 9/25 [00:01<00:02,  6.95it/s]\n 40%|████      | 10/25 [00:01<00:02,  6.90it/s]\n 44%|████▍     | 11/25 [00:01<00:02,  6.89it/s]\n 48%|████▊     | 12/25 [00:01<00:01,  6.88it/s]\n 52%|█████▏    | 13/25 [00:01<00:01,  6.95it/s]\n 56%|█████▌    | 14/25 [00:02<00:01,  6.83it/s]\n 60%|██████    | 15/25 [00:02<00:01,  6.85it/s]\n 64%|██████▍   | 16/25 [00:02<00:01,  6.81it/s]\n 68%|██████▊   | 17/25 [00:02<00:01,  6.77it/s]\n 72%|███████▏  | 18/25 [00:02<00:01,  6.77it/s]\n 76%|███████▌  | 19/25 [00:02<00:00,  6.78it/s]\n 80%|████████  | 20/25 [00:02<00:00,  6.73it/s]\n 84%|████████▍ | 21/25 [00:03<00:00,  6.62it/s]\n 88%|████████▊ | 22/25 [00:03<00:00,  6.55it/s]\n 92%|█████████▏| 23/25 [00:03<00:00,  6.47it/s]\n 96%|█████████▌| 24/25 [00:03<00:00,  6.41it/s]\n100%|██████████| 25/25 [00:03<00:00,  6.36it/s]\n100%|██████████| 25/25 [00:03<00:00,  6.75it/s]\n3 [[<PIL.Image.Image image mode=RGB size=596x1044 at 0x7657781D3390>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x7657781ED890>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x76577EDFB050>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x765777D71D90>]]\n-1 [[<PIL.Image.Image image mode=RGB size=596x1044 at 0x7657781D3390>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x7657781ED890>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x76577EDFB050>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x765777D71D90>], [<PIL.Image.Image image mode=RGB size=596x1044 at 0x76577AB28D50>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x7657782165D0>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x765778216390>]]\n[[<PIL.Image.Image image mode=RGB size=596x1044 at 0x7657781D3390>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x7657781ED890>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x76577EDFB050>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x765777D71D90>], [<PIL.Image.Image image mode=RGB size=596x1044 at 0x76577AB28D50>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x7657782165D0>, <PIL.Image.Image image mode=RGB size=596x1044 at 0x765778216390>, <PIL.Image.Image image mode=RGBA size=596x1044 at 0x76577AB1EF50>]]\n3 (22, 789)\n3 (1, 775)\nconverted after karras tensor([7.0000e+02, 3.7299e+02, 1.8675e+02, 8.6664e+01, 3.6584e+01, 1.3678e+01,\n4.3526e+00, 1.1064e+00, 2.0120e-01, 0.0000e+00], device='cuda:0')\ndenoise currently\ntensor(372.9909, device='cuda:0')\n  0%|          | 0/9 [00:00<?, ?it/s]\ndenoise currently\ntensor(186.7495, device='cuda:0')\n 11%|█         | 1/9 [00:04<00:33,  4.21s/it]\ndenoise currently\ntensor(86.6642, device='cuda:0')\n 22%|██▏       | 2/9 [00:07<00:24,  3.53s/it]\ndenoise currently\ntensor(36.5844, device='cuda:0')\n 33%|███▎      | 3/9 [00:10<00:19,  3.31s/it]\ndenoise currently\ntensor(13.6784, device='cuda:0')\n 44%|████▍     | 4/9 [00:13<00:16,  3.25s/it]\ndenoise currently\ntensor(4.3526, device='cuda:0')\n 56%|█████▌    | 5/9 [00:16<00:12,  3.24s/it]\ndenoise currently\ntensor(1.1064, device='cuda:0')\n 67%|██████▋   | 6/9 [00:19<00:09,  3.17s/it]\ndenoise currently\ntensor(0.2012, device='cuda:0')\n 78%|███████▊  | 7/9 [00:22<00:06,  3.14s/it]\ndenoise currently\ntensor(0., device='cuda:0')\n 89%|████████▉ | 8/9 [00:25<00:03,  3.11s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.10s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.21s/it]\nConverting (0.00) ...\nconverted after karras tensor([7.0000e+02, 3.7299e+02, 1.8675e+02, 8.6664e+01, 3.6584e+01, 1.3678e+01,\n4.3526e+00, 1.1064e+00, 2.0120e-01, 0.0000e+00], device='cuda:0')\ndenoise currently\ntensor(372.9909, device='cuda:0')\n  0%|          | 0/9 [00:00<?, ?it/s]\ndenoise currently\ntensor(186.7495, device='cuda:0')\n 11%|█         | 1/9 [00:03<00:30,  3.83s/it]\ndenoise currently\ntensor(86.6642, device='cuda:0')\n 22%|██▏       | 2/9 [00:06<00:23,  3.42s/it]\ndenoise currently\ntensor(36.5844, device='cuda:0')\n 33%|███▎      | 3/9 [00:10<00:19,  3.25s/it]\ndenoise currently\ntensor(13.6784, device='cuda:0')\n 44%|████▍     | 4/9 [00:13<00:15,  3.18s/it]\ndenoise currently\ntensor(4.3526, device='cuda:0')\n 56%|█████▌    | 5/9 [00:16<00:12,  3.14s/it]\ndenoise currently\ntensor(1.1064, device='cuda:0')\n 67%|██████▋   | 6/9 [00:19<00:09,  3.11s/it]\ndenoise currently\ntensor(0.2012, device='cuda:0')\n 78%|███████▊  | 7/9 [00:22<00:06,  3.10s/it]\ndenoise currently\ntensor(0., device='cuda:0')\n 89%|████████▉ | 8/9 [00:25<00:03,  3.09s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.08s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.16s/it]\nConverting (0.00) ...\nconverted after karras tensor([7.0000e+02, 3.7299e+02, 1.8675e+02, 8.6664e+01, 3.6584e+01, 1.3678e+01,\n4.3526e+00, 1.1064e+00, 2.0120e-01, 0.0000e+00], device='cuda:0')\ndenoise currently\ntensor(372.9909, device='cuda:0')\n  0%|          | 0/9 [00:00<?, ?it/s]\ndenoise currently\ntensor(186.7495, device='cuda:0')\n 11%|█         | 1/9 [00:03<00:29,  3.64s/it]\ndenoise currently\ntensor(86.6642, device='cuda:0')\n 22%|██▏       | 2/9 [00:06<00:23,  3.30s/it]\ndenoise currently\ntensor(36.5844, device='cuda:0')\n 33%|███▎      | 3/9 [00:10<00:20,  3.36s/it]\ndenoise currently\ntensor(13.6784, device='cuda:0')\n 44%|████▍     | 4/9 [00:13<00:16,  3.24s/it]\ndenoise currently\ntensor(4.3526, device='cuda:0')\n 56%|█████▌    | 5/9 [00:16<00:12,  3.18s/it]\ndenoise currently\ntensor(1.1064, device='cuda:0')\n 67%|██████▋   | 6/9 [00:19<00:09,  3.14s/it]\ndenoise currently\ntensor(0.2012, device='cuda:0')\n 78%|███████▊  | 7/9 [00:22<00:06,  3.12s/it]\ndenoise currently\ntensor(0., device='cuda:0')\n 89%|████████▉ | 8/9 [00:25<00:03,  3.10s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.09s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.17s/it]\nConverting (0.00) ...\nconverted after karras tensor([7.0000e+02, 3.7299e+02, 1.8675e+02, 8.6664e+01, 3.6584e+01, 1.3678e+01,\n4.3526e+00, 1.1064e+00, 2.0120e-01, 0.0000e+00], device='cuda:0')\ndenoise currently\ntensor(372.9909, device='cuda:0')\n  0%|          | 0/9 [00:00<?, ?it/s]\ndenoise currently\ntensor(186.7495, device='cuda:0')\n 11%|█         | 1/9 [00:03<00:28,  3.62s/it]\ndenoise currently\ntensor(86.6642, device='cuda:0')\n 22%|██▏       | 2/9 [00:06<00:23,  3.29s/it]\ndenoise currently\ntensor(36.5844, device='cuda:0')\n 33%|███▎      | 3/9 [00:10<00:20,  3.35s/it]\ndenoise currently\ntensor(13.6784, device='cuda:0')\n 44%|████▍     | 4/9 [00:13<00:16,  3.24s/it]\ndenoise currently\ntensor(4.3526, device='cuda:0')\n 56%|█████▌    | 5/9 [00:16<00:12,  3.18s/it]\ndenoise currently\ntensor(1.1064, device='cuda:0')\n 67%|██████▋   | 6/9 [00:19<00:09,  3.14s/it]\ndenoise currently\ntensor(0.2012, device='cuda:0')\n 78%|███████▊  | 7/9 [00:22<00:06,  3.12s/it]\ndenoise currently\ntensor(0., device='cuda:0')\n 89%|████████▉ | 8/9 [00:25<00:03,  3.10s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.09s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.17s/it]\nConverting (0.00) ...\nconverted after karras tensor([7.0000e+02, 3.7299e+02, 1.8675e+02, 8.6664e+01, 3.6584e+01, 1.3678e+01,\n4.3526e+00, 1.1064e+00, 2.0120e-01, 0.0000e+00], device='cuda:0')\ndenoise currently\ntensor(372.9909, device='cuda:0')\n  0%|          | 0/9 [00:00<?, ?it/s]\ndenoise currently\ntensor(186.7495, device='cuda:0')\n 11%|█         | 1/9 [00:03<00:28,  3.61s/it]\ndenoise currently\ntensor(86.6642, device='cuda:0')\n 22%|██▏       | 2/9 [00:06<00:23,  3.29s/it]\ndenoise currently\ntensor(36.5844, device='cuda:0')\n 33%|███▎      | 3/9 [00:09<00:19,  3.19s/it]\ndenoise currently\ntensor(13.6784, device='cuda:0')\n 44%|████▍     | 4/9 [00:12<00:15,  3.15s/it]\ndenoise currently\ntensor(4.3526, device='cuda:0')\n 56%|█████▌    | 5/9 [00:15<00:12,  3.12s/it]\ndenoise currently\ntensor(1.1064, device='cuda:0')\n 67%|██████▋   | 6/9 [00:18<00:09,  3.10s/it]\ndenoise currently\ntensor(0.2012, device='cuda:0')\n 78%|███████▊  | 7/9 [00:22<00:06,  3.09s/it]\ndenoise currently\ntensor(0., device='cuda:0')\n 89%|████████▉ | 8/9 [00:25<00:03,  3.08s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.08s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.13s/it]\nConverting (0.00) ...\nconverted after karras tensor([7.0000e+02, 3.7299e+02, 1.8675e+02, 8.6664e+01, 3.6584e+01, 1.3678e+01,\n4.3526e+00, 1.1064e+00, 2.0120e-01, 0.0000e+00], device='cuda:0')\ndenoise currently\ntensor(372.9909, device='cuda:0')\n  0%|          | 0/9 [00:00<?, ?it/s]\ndenoise currently\ntensor(186.7495, device='cuda:0')\n 11%|█         | 1/9 [00:03<00:28,  3.60s/it]\ndenoise currently\ntensor(86.6642, device='cuda:0')\n 22%|██▏       | 2/9 [00:06<00:22,  3.28s/it]\ndenoise currently\ntensor(36.5844, device='cuda:0')\n 33%|███▎      | 3/9 [00:09<00:19,  3.19s/it]\ndenoise currently\ntensor(13.6784, device='cuda:0')\n 44%|████▍     | 4/9 [00:12<00:15,  3.14s/it]\ndenoise currently\ntensor(4.3526, device='cuda:0')\n 56%|█████▌    | 5/9 [00:15<00:12,  3.11s/it]\ndenoise currently\ntensor(1.1064, device='cuda:0')\n 67%|██████▋   | 6/9 [00:18<00:09,  3.10s/it]\ndenoise currently\ntensor(0.2012, device='cuda:0')\n 78%|███████▊  | 7/9 [00:22<00:06,  3.09s/it]\ndenoise currently\ntensor(0., device='cuda:0')\n 89%|████████▉ | 8/9 [00:25<00:03,  3.08s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.08s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.13s/it]\nConverting (0.00) ...\nconverted after karras tensor([7.0000e+02, 3.7299e+02, 1.8675e+02, 8.6664e+01, 3.6584e+01, 1.3678e+01,\n4.3526e+00, 1.1064e+00, 2.0120e-01, 0.0000e+00], device='cuda:0')\ndenoise currently\ntensor(372.9909, device='cuda:0')\n  0%|          | 0/9 [00:00<?, ?it/s]\ndenoise currently\ntensor(186.7495, device='cuda:0')\n 11%|█         | 1/9 [00:03<00:28,  3.61s/it]\ndenoise currently\ntensor(86.6642, device='cuda:0')\n 22%|██▏       | 2/9 [00:06<00:23,  3.29s/it]\ndenoise currently\ntensor(36.5844, device='cuda:0')\n 33%|███▎      | 3/9 [00:09<00:19,  3.19s/it]\ndenoise currently\ntensor(13.6784, device='cuda:0')\n 44%|████▍     | 4/9 [00:12<00:15,  3.14s/it]\ndenoise currently\ntensor(4.3526, device='cuda:0')\n 56%|█████▌    | 5/9 [00:15<00:12,  3.12s/it]\ndenoise currently\ntensor(1.1064, device='cuda:0')\n 67%|██████▋   | 6/9 [00:18<00:09,  3.10s/it]\ndenoise currently\ntensor(0.2012, device='cuda:0')\n 78%|███████▊  | 7/9 [00:22<00:06,  3.09s/it]\ndenoise currently\ntensor(0., device='cuda:0')\n 89%|████████▉ | 8/9 [00:25<00:03,  3.09s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.08s/it]\n100%|██████████| 9/9 [00:28<00:00,  3.13s/it]\nConverting (0.00) ...\nMoviepy - Building video /tmp/Icqi1D1ErxO2bZrPDN0VptTI.mp4.\nMoviepy - Writing video /tmp/Icqi1D1ErxO2bZrPDN0VptTI.mp4\nt:   0%|          | 0/176 [00:00<?, ?it/s, now=None]\nt:  15%|█▍        | 26/176 [00:00<00:00, 251.00it/s, now=None]\nt:  30%|██▉       | 52/176 [00:00<00:00, 145.80it/s, now=None]\nt:  39%|███▉      | 69/176 [00:00<00:01, 106.66it/s, now=None]\nt:  47%|████▋     | 82/176 [00:00<00:00, 98.17it/s, now=None] \nt:  53%|█████▎    | 93/176 [00:00<00:00, 90.73it/s, now=None]\nt:  59%|█████▊    | 103/176 [00:01<00:00, 88.67it/s, now=None]\nt:  64%|██████▍   | 113/176 [00:01<00:00, 84.81it/s, now=None]\nt:  69%|██████▉   | 122/176 [00:01<00:00, 74.69it/s, now=None]\nt:  75%|███████▌  | 132/176 [00:01<00:00, 80.20it/s, now=None]\nt:  80%|████████  | 141/176 [00:01<00:00, 80.19it/s, now=None]\nt:  85%|████████▌ | 150/176 [00:01<00:00, 77.11it/s, now=None]\nt:  90%|█████████ | 159/176 [00:01<00:00, 75.01it/s, now=None]\nt:  95%|█████████▍| 167/176 [00:01<00:00, 75.49it/s, now=None]\nt: 100%|██████████| 176/176 [00:01<00:00, 75.21it/s, now=None]\nMoviepy - Done !\nMoviepy - video ready /tmp/Icqi1D1ErxO2bZrPDN0VptTI.mp4\n",
    output: {
      final_video_story:
        "https://replicate.delivery/pbxt/3wNEi85jsH7lBty2KVbKUPH3iXgBaBwbz6cGdl1jhLwCdH4E/Icqi1D1ErxO2bZrPDN0VptTI.mp4",
      individual_images: [
        "https://replicate.delivery/pbxt/el3kCe1wb9msQUYYO0Yr7vFoh7kw1OUfd06H5MZJHwCTo7AnA/out-0.jpeg",
        "https://replicate.delivery/pbxt/vs1eYGNH4tzlQqztUi7v2P13672ew5fNS4Ao92PXSgyTo7AnA/out-1.jpeg",
        "https://replicate.delivery/pbxt/DbO63jQllGblJBfW1Yu10zLviKZkffmsLnQl9Jc23cHSo7AnA/out-2.jpeg",
        "https://replicate.delivery/pbxt/B9G5jjYuanLYA15CFWWASdsyg7eK9t1kR5fq85BqfV3Vo7AnA/out-3.jpeg",
        "https://replicate.delivery/pbxt/D9IEmiig8EZFPxeBADfeeMNqrGNep1bk9vn0Ev4U9i2ThuDcC/out-4.jpeg",
        "https://replicate.delivery/pbxt/l2tgJ1lLDW6rEdvZfoEcuryf7lSe8H3KPqflw5fLefuZF6OwJA/out-5.jpeg",
        "https://replicate.delivery/pbxt/zuh8vnWKo5pXFFvFT3jUfepvtshovDYKFNklMtA4aWCL0dgTA/out-6.jpeg",
      ],
      individual_videos: [
        "https://replicate.delivery/pbxt/Ca0qYc9hIMLuOFBReIO3eS0rlQc0fOD90hhtYnfemIo6guDcC/78LVTetwmepoAWPIczp1KUHE.mp4",
        "https://replicate.delivery/pbxt/ZSU5eo3emziHzkTrQxr1t7Xt9kuXnJafXPKVifxOeGafBdH4E/4BRxBbOGb4xIcgNgkT2CcbqU.mp4",
        "https://replicate.delivery/pbxt/fAykA7wnFYy3EK5EPoxeo7dy8PJIk7McW8yR1i9Q9tKH0dgTA/rzqEmhhXCqYpL1WpBQr92Z6o.mp4",
        "https://replicate.delivery/pbxt/QNSvMkXPyGqdEhO6yxpF8BRvPWpGEfQAjDYKJJBoMcXE6OwJA/5omUwdrTZOWJJdrarO1WVbB8.mp4",
        "https://replicate.delivery/pbxt/i25WgkMpbzZiJZlYDhX8G32ZCBZRPVHaKD2EwXFAPWFCdH4E/odxJXnAMUpNy8qFKlDSmqh6M.mp4",
        "https://replicate.delivery/pbxt/7lGatU7rWRb7NVdJ2emZn3oGxQMW7OEBDfThcHFmeyeiQ3BOB/mRJpSWppWCsfxgrcAbJz0nsT.mp4",
        "https://replicate.delivery/pbxt/6itRRhdACwYUHNBrOjFm1odkNsV7yroLwJbZPK4hMhdCdH4E/WRa6Ow5IiKVo35nA1PB3Um4h.mp4",
      ],
      story_board:
        "https://replicate.delivery/pbxt/7PfNJ6h3Lj1beUb28bD5IZmxgbgQHX02fpaVQleNGvbaQ3BOB/comic.jpeg",
    },
    data_removed: false,
    error: null,
    status: "succeeded",
    created_at: "2024-09-25T15:08:21.702Z",
    started_at: "2024-09-25T15:18:18.562464048Z",
    completed_at: "2024-09-25T15:23:55.806668333Z",
    urls: {
      cancel:
        "https://api.replicate.com/v1/predictions/e68wftq58srgp0cj56wsn4cy7c/cancel",
      get: "https://api.replicate.com/v1/predictions/e68wftq58srgp0cj56wsn4cy7c",
    },
    metrics: {
      predict_time: 337.244204284,
    },
  });
  const [error, setError] = useState(null);
  const [imageSrc, setImageSrc] = useState();

  const [image, setImage] = useState();

  const [imageError, setImageError] = useState();

  const [videoUrl, setVideoUrl] = useState("");
  const [usage, setUsage] = useState("");

  const [characters, setCharacters] = useState("");
  const [idea, setIdea] = useState("");
  const [numPanels, setNumPanels] = useState("");
  const [storyDescription, setStoryDescription] = useState("");

  const [style, setStyle] = useState("");
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(720);
  const [aspectRatio, setAspectRatio] = useState("");
  const [numIds, setNumIds] = useState("");

  const [isOverUsageLimit, setIsOverUsageLimit] = useState(true);

  const [isRefImage, setIsRefImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [effect, setEffect] = useState(false);
  const [startDate, setStartDate] = useState("");

  const { isSignedIn, user } = useUser();
  const [activeStep, setActiveStep] = useState(1);
  const [motion, setMotion] = useState(80);
  const [fps, setFps] = useState(6);
  const [numInferenceSteps, setNumInferenceSteps] = useState(9);
  const [image_url, setImageUrl] = useState("");
  const [activeSlide, setActiveSlide] = useState(0);

  // updated code subscription check

  const [count, setCount] = useState(0);

  const { subscriptionData, decreaseStoryBoardAndImage2VideoCount } =
    useContext(SubscriptionContext);

  console.log("here is sub data", subscriptionData);

  useEffect(() => {
    setCount(subscriptionData?.metadata?.storyBoardCount);
    // fetchUserUsage();
  }, [subscriptionData?.metadata?.storyBoardCount]);

  const handleImageChange = (e) => {
    setImageError("");
    const img = e.target.files[0];
    // if no image selected
    if (!img) {
      return;
    }

    // check if image
    const result = isImage(img.name);
    if (!result) {
      const error = "File type should be a jpg/jpeg image";
      toast(error, { type: "error" });
      setImageError(error);
      return;
    }
    const isImageLarge = validateImgSize(img);
    if (isImageLarge) {
      const error = "File must be less or equal to 1MB";
      toast(error, { type: "error" });
      setImageError(error);
      return;
    }
    const reader = new FileReader();
    // converts to BASE 64
    reader.readAsDataURL(img);
    reader.addEventListener("load", () => {
      setImageSrc(reader.result);
      setImage(img);
      setIsRefImage(true);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsGenerating(true);
    const res = await fetch("/api/returnStoryDescription", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        characters,
        idea,
        numPanels,
      }),
    });
    setIsGenerating(false);
    const data = await res.json();
    setStoryDescription(data.storyDescription.trim());
  };

  //handle form submit to create avatar and create record in the database
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (subscriptionData?.metadata?.storyBoardCount == "0") {
      window.alert("No attempt left , Please purchase a plan");
      return;
    }

    const form = event.currentTarget;

    if (isRefImage) {
      const image_fileInput = Array.from(form.elements).find(
        ({ name }) => name === "image"
      );

      const image_formData = new FormData();

      for (const file of image_fileInput.files) {
        image_formData.append("file", file);
      }

      image_formData.append("upload_preset", "app_users");

      const image_data = await fetch(
        "https://api.cloudinary.com/v1_1/dvdxxna6v/image/upload",
        {
          method: "POST",
          body: image_formData,
        }
      ).then((r) => r.json());

      const image_url = image_data.secure_url;

      if (aspectRatio == "16:9") {
        var body = {
          num_ids: 3,
          ref_image: image_url,
          style_name: style,
          story_description: storyDescription,
          character_description: characters,
          aspect_ratio: aspectRatio,
          video_width: 1280,
          video_height: 720,
        };
      } else {
        var body = {
          num_ids: 3,
          ref_image: image_url,
          style_name: style,
          story_description: storyDescription,
          character_description: characters,
          aspect_ratio: aspectRatio,
          video_width: 608,
          video_height: 1080,
        };
      }
    } else {
      // post request to prediction api to create talking avatar
      if (aspectRatio == "16:9") {
        var body = {
          num_ids: 3,
          style_name: style,
          story_description: storyDescription,
          character_description: characters,
          aspect_ratio: aspectRatio,
          video_width: 1280,
          video_height: 720,
        };
      } else {
        var body = {
          num_ids: 3,
          style_name: style,
          story_description: storyDescription,
          character_description: characters,
          aspect_ratio: aspectRatio,
          video_width: 608,
          video_height: 1080,
        };
      }
    }

    const story_response = await fetch("/api/video_story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    let storyPrediction = await story_response.json();
    if (story_response.status !== 201) {
      setError(storyPrediction.detail);
      setStoryPrediction(storyPrediction);
      return;
    }
    setStoryPrediction(storyPrediction);

    while (
      storyPrediction.status !== "succeeded" &&
      storyPrediction.status !== "failed"
    ) {
      await sleep(1000);
      const story_response = await fetch(
        "/api/video_story/" + storyPrediction.id
      );
      storyPrediction = await story_response.json();
      if (story_response.status !== 200) {
        setError(storyPrediction.detail);
        return;
      }
      console.log({ storyPrediction });
      setStoryPrediction(storyPrediction);
    }
    if (storyPrediction.status == "succeeded") {
      setStoryPrediction(storyPrediction);
      const updatedCount = await decreaseStoryBoardAndImage2VideoCount(
        user?.primaryEmailAddress?.emailAddress
      );
      setCount(updatedCount?.metadata?.storyBoardCount);
    }

    //const story_url = storyPrediction?.output;
    //setImageSrc(data.secure_url);

    // post request to prediction api to create talking avatar

    // post request to creation api to create creation record in the database

    setImage("");
  };

  const stepMemo = useMemo(() => {
    switch (activeStep) {
      case 1:
        return (
          <ImageOption
            value={style}
            setStyle={setStyle}
            setActiveStep={setActiveStep}
          />
        );
      case 2:
        return (
          <ImageRatio
            setActiveStep={setActiveStep}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        );
      case 3:
        return (
          <Character
            characters={characters}
            setCharacters={setCharacters}
            setActiveStep={setActiveStep}
            handleImageChange={handleImageChange}
            imageSrc={imageSrc}
            setImageSrc={setImageSrc}
          />
        );
      case 4:
        return (
          <StoryIdea
            idea={idea}
            setIdea={setIdea}
            setActiveStep={setActiveStep}
            numPanels={numPanels}
            setNumPanels={setNumPanels}
            handleSubmit={handleSubmit}
          />
        );
      case 5:
        return (
          <Description
            setActiveStep={setActiveStep}
            storyDescription={storyDescription}
            setStoryDescription={setStoryDescription}
            handleOnSubmit={handleOnSubmit}
          />
        );

      default:
        break;
    }
  });

  // regenerate video

  const handleRegenerateVideo = async (event) => {
    event.preventDefault();

    if (subscriptionData?.metadata?.storyBoardCount == "0") {
      window.alert("No attempt left , Please purchase a plan");
      return;
    }
    console.log("test");
    // post request to i2v_prediction api for image to video
    var video_body = {
      image_in: image_url,
      seed: 42,
      aspect_ratio: storyPrediction?.input?.aspect_ratio,
      motion: motion,
      fps: fps,
      num_inference_steps: numInferenceSteps,
    };

    const video_response = await fetch("/api/i2v_predictions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(video_body),
    });

    let videoPrediction = await video_response.json();
    if (video_response.status !== 201) {
      setError(videoPrediction.detail);

      return;
    }
    console.log({ videoPrediction });
    setStoryPrediction((prev) => {
      let currentStory = prev?.output?.individual_videos.splice(
        activeSlide,
        1,
        videoPrediction?.output
      );
      return { ...prev, individual_videos: currentStory };
    });
    while (
      videoPrediction.status !== "succeeded" &&
      videoPrediction.status !== "failed"
    ) {
      await sleep(1000);
      const video_response = await fetch(
        "/api/i2v_predictions/" + videoPrediction.id
      );
      videoPrediction = await video_response.json();
      console.log({ videoPrediction });
      if (video_response.status !== 200) {
        setError(videoPrediction.detail);
        setStoryPrediction((prev) => {
          let currentStory = prev?.output?.individual_videos.splice(
            activeSlide,
            1,
            videoPrediction?.output
          );
          return { ...prev, individual_videos: currentStory };
        });
        return;
      }
      console.log({ videoPrediction });
      setStoryPrediction((prev) => {
        let currentStory = prev?.output?.individual_videos.splice(
          activeSlide,
          1,
          videoPrediction?.output
        );
        return { ...prev, individual_videos: currentStory };
      });
    }

    if (videoPrediction.status == "succeeded") {
      setStoryPrediction((prev) => {
        let currentStory = prev?.output?.individual_videos.splice(
          activeSlide,
          1,
          videoPrediction?.output
        );
        return { ...prev, individual_videos: currentStory };
      });

      const updatedCount = await decreaseStoryBoardAndImage2VideoCount(
        user?.primaryEmailAddress?.emailAddress
      );
      setCount(updatedCount?.metadata?.storyBoardCount);
    }
    setImage("");
  };

  console.log({ storyPrediction, aspectRatio });

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-y-12 md:grid-cols-1 md:gap-x-12 ">
        <div className="">
          <h1 className="inline-block  mb-5 text-center border border-gray-400 rounded transition-all duration-500  text-[#ccc5b9] font-semibold py-3 px-3 lg:px-3">
            Available generation : {count || 0}
          </h1>
          {/* <form onSubmit={(e) => handleOnSubmit(e)}>
            <h1 className="inline-block  mb-5 text-center border border-gray-400 rounded transition-all duration-500  text-[#ccc5b9] font-semibold py-3 px-3 lg:px-3">
              Available generation : {count || 0}
            </h1>

            <div className="flex flex-col">
              <div className="flex mt-10 items-center space-x-3">
                <div
                  style={{ backgroundColor: "#5BBCFF" }}
                  className="rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                >
                  {1}
                </div>
                <p className="text-left font-medium flex align-center">
                  {"Characters"}
                </p>
              </div>
              <textarea
                type="text"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                rows={3}
                name="characters"
                placeholder="Bella, a girl with a slender frame, long auburn hair, and piercing green eyes"
                id="characters"
                value={characters}
                onChange={(e) => setCharacters(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <div className="flex mt-10 items-center space-x-3">
                <div
                  style={{ backgroundColor: "#5BBCFF" }}
                  className="rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                >
                  {2}
                </div>
                <p className="text-left font-medium flex align-center">
                  {"Story Idea"}
                </p>
              </div>

              <input
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                placeholder="Idea"
                type="text"
                name="idea"
                id="idea"
              />
            </div>

            <div className="flex flex-col">
              <div className="flex mt-10 items-center space-x-3">
                <div
                  style={{ backgroundColor: "#5BBCFF" }}
                  className="rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                >
                  {3}
                </div>
                <p className="text-left font-medium flex align-center">
                  {"Number of  Panels"}
                </p>
              </div>

              <select
                value={numPanels}
                onChange={(e) => setNumPanels(e.target.value)}
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
                name="numPanels"
                id="numPanels"
              >
                <option value="default">Select Number of Panels</option>
                <option value="four">four</option>
                <option value="five">five</option>
                <option value="six">six</option>
                <option value="seven">seven</option>
                <option value="eight">eight</option>
                <option value="nine">nine</option>
              </select>
            </div>

            <button
              className="hero-button min-h-[40px] shadow-sm sm: w-[250px] py-2 inline-flex justify-center font-medium items-center px-4 text-gray-100 sm:rounded-md"
              onClick={handleSubmit}
              type="submit"
              disabled={
                isGenerating ||
                characters === "" ||
                idea === "" ||
                numPanels === ""
              }
            >
              {isGenerating ? "Generating..." : "Generate Story Description"}
            </button>

            <div className="flex flex-col">
              <div className="flex mt-10 items-center space-x-3">
                <div
                  style={{ backgroundColor: "#5BBCFF" }}
                  className="rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                >
                  {4}
                </div>
                <p className="text-left font-medium flex align-center">
                  {"Story Description"}
                </p>
              </div>

              <textarea
                rows={
                  storyDescription === ""
                    ? 7
                    : storyDescription.split("\n").length + 12
                }
                name="output"
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
                //disabled={storyDescription === ""}
                id="output"
                placeholder="AI Generated Story Description"
                className="block w-full rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-gray-500 my-2 text-gray-900"
              />
            </div>

            <div className="flex flex-col ">
              <div className="flex mt-10 items-center space-x-3">
                <div
                  style={{ backgroundColor: "#5BBCFF" }}
                  className="rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                >
                  {5}
                </div>
                <p className="text-left font-medium flex align-center">
                  {"Reference Image (Optional)"}
                </p>
              </div>

              <label className="px-2 py-1 text-sm text-white">
                Use Ref Image:{" "}
                <input
                  type="checkbox"
                  name="isRefImage"
                  defaultChecked={false}
                  color="success"
                />
              </label>
            </div>
            <div className="flex flex-col ">
              <label className="px-2 py-1 text-sm text-white" htmlFor="image">
                Reference Image (Optional) {"   "}
                {"    "}
                <span className="text-sm text-red-500">(jpg/jpeg) </span>
                <span className="text-sm text-red-400">*</span>
              </label>
              <input
                type="file"
                className="hero-button flex rounded-md bg-white border border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 placeholder-white-500 my-2 text-white-900"
                name="image"
                placeholder="Select Picture"
                onChange={handleImageChange}
              />

              <img
                src={imageSrc}
                className="basis-1/2 h-auto w-48 my-5"
                accept="image/*"
              />
            </div>

            <div>
              <div className="flex mt-10 items-center space-x-3">
                <div
                  style={{ backgroundColor: "#5BBCFF" }}
                  className="rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm"
                >
                  {6}
                </div>
                <p className="text-left font-medium flex align-center">
                  {"Options"}
                </p>
              </div>
              <FormControl
                sx={{
                  m: 1,
                  minWidth: 150,
                  bgcolor: "#5BBCFF",
                  borderRadius: 1,
                }}
              >
                <InputLabel id="demo-simple-select-required-label">
                  Image Style
                </InputLabel>
                <Select
                  name="style"
                  label="Image Style"
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <MenuItem value="Japanese Anime">
                    <em>Japanese Anime</em>
                  </MenuItem>
                  <MenuItem value="Digital/Oil Painting">
                    Digital/Oil Painting
                  </MenuItem>
                  <MenuItem value="Pixar/Disney Character">
                    Pixar/Disney Character
                  </MenuItem>
                  <MenuItem value="Cinematic">Cinematic</MenuItem>
                  <MenuItem value="Photographic">Photographic</MenuItem>
                  <MenuItem value="Comic book">Comic book</MenuItem>
                  <MenuItem value="Line art">Line art</MenuItem>
                  <MenuItem value="Black and White Film Noir">
                    Black and White Film Noir
                  </MenuItem>
                  <MenuItem value="Isometric Rooms">Isometric Rooms</MenuItem>
                </Select>
              </FormControl>

              <FormControl
                sx={{
                  m: 1,
                  minWidth: 150,
                  bgcolor: "#5BBCFF",
                  borderRadius: 1,
                }}
              >
                <InputLabel id="demo-simple-select-required-label">
                  Aspect Ratio
                </InputLabel>
                <Select
                  name="aspectRatio"
                  label="Aspect Ratio"
                  onChange={(e) => setAspectRatio(e.target.value)}
                >
                  <MenuItem value="16:9">
                    <em>16:9</em>
                  </MenuItem>
                  <MenuItem value="9:16">9:16</MenuItem>
                </Select>
              </FormControl>
            </div>

            {count == 0 ? (
              <Link href="/pricing">
                <button className="hero-button text-white font-bold py-2 px-4 rounded">
                  Buy a Plan
                </button>
              </Link>
            ) : (
              <button
                className={`hero-button flex w-full text-white font-bold py-2 px-4 rounded`}
                type="submit"
                disabled={
                  isGenerating ||
                  characters === "" ||
                  storyDescription === "" ||
                  style === "" ||
                  aspectRatio === ""
                }
              >
                {isGenerating ? "Generating..." : "Generate Video Story"}
              </button>
            )}
          </form> */}
          {stepMemo}
        </div>

        <div className="">
          <div className="flex flex-col">
            <label htmlFor="output" className="sr-only">
              Output
            </label>

            <p className="py-3 text-sm opacity-50">
              Generation Status: {storyPrediction?.status}
            </p>

            {storyPrediction?.output && (
              <video
                controls
                muted
                autoPlay
                src={storyPrediction.output.final_video_story}
                width={width}
                height={height}
                alt="output"
              />
            )}
            <VideoStorySlider
              gallery={storyPrediction?.output?.individual_videos}
              galleryImages={storyPrediction?.output?.individual_images}
              setStoryPrediction={setStoryPrediction}
              width={width}
              height={height}
              setMotion={setMotion}
              setFps={setFps}
              setNumInferenceSteps={setNumInferenceSteps}
              handleRegenerateVideo={handleRegenerateVideo}
              setImageUrl={setImageUrl}
              activeSlide={activeSlide}
              setActiveSlide={setActiveSlide}
            />
          </div>
        </div>
      </div>

      <Disclaimer />

      <StoryBoardFAQ />
    </div>
  );
}
