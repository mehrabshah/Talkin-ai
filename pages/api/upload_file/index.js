import { IncomingForm } from "formidable"; 
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm(); 


  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the files:", err);
      return res.status(500).json({ message: "Error uploading file" });
    }


    const file = files.audio[0]; 

    const { originalFilename } = file;
    
    const newFileName = Date.now() + "_" + originalFilename; 

    const publicPath = path.join(process.cwd(), "public", "gallery", newFileName);

    fs.rename(file.filepath, publicPath, (err) => {
      if (err) {
        console.error("Error moving the file:", err);
        return res.status(500).json({ message: "Error saving file" });
      }

      const trackPath = `/gallery/${newFileName}`;
      return res.status(200).json({ path: trackPath });
    });
  });
}
