import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  const filePath = path.join(process.cwd(), 'public', 'silent.mp3'); 

  try {
    const fileBuffer = fs.readFileSync(filePath);
    const base64String = fileBuffer.toString('base64');
    const dataUrl = `data:application/octet-stream;base64,${base64String}`;
    res.status(200).json({ audioData: dataUrl });
  } catch (error) {
    console.error("Error reading silent audio file:", error);
    res.status(500).json({ error: "Failed to load silent audio" });
  }
}
