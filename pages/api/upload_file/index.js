// pages/api/upload.js
import { IncomingForm } from "formidable"; // Correctly importing IncomingForm
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing for file uploads
  },
};

export default async function handler(req, res) {
  const form = new IncomingForm(); // Create a new IncomingForm instance


  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Error parsing the files:", err);
      return res.status(500).json({ message: "Error uploading file" });
    }


    const file = files.audio[0]; // Get the uploaded file

    const { originalFilename } = file;
    
    // Create a new filename or use the existing one
    const newFileName = Date.now() + "_" + originalFilename; // Adding timestamp to avoid conflicts

    // Define the path to save the file
    const publicPath = path.join(process.cwd(), "public", "gallery", newFileName);

    // Move the file to the public directory
    fs.rename(file.filepath, publicPath, (err) => {
      if (err) {
        console.error("Error moving the file:", err);
        return res.status(500).json({ message: "Error saving file" });
      }

      // Respond with the path of the uploaded track
      const trackPath = `/gallery/${newFileName}`;
      return res.status(200).json({ path: trackPath });
    });
  });
}
