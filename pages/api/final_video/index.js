// pages/api/process-media.js

import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';
import ffprobePath from 'ffprobe-static';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath.path);
/**
 * Helper function to debug logs.
 * 
 * @param {...any} args - Arguments to log.
 */
const debugLog = (...args) => {
    if (process.env.DEBUG) {
        console.log(...args);
    }
};

/**
 * Get the duration of a media file.
 * 
 * @param {string} filePath - Path to the media file.
 * @returns {Promise<number>} - Resolves with the duration in seconds.
 */
function getDuration(filePath) {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
            if (err) {
                return reject(err);
            }
            resolve(metadata.format.duration);
        });
    });
}

/**
 * Loop the video to match the audio duration.
 * 
 * @param {string} videoPath - Path to the video file.
 * @param {number} audioDuration - Duration of the audio file.
 * @param {string} outputLoopedVideoPath - Path to save the looped video.
 * @returns {Promise<string>} - Resolves with the path of the looped video.
 */
function loopVideo(videoPath, audioDuration, outputLoopedVideoPath) {
    debugLog(`Looping video: ${videoPath} to match audio duration: ${audioDuration}`);
    return new Promise((resolve, reject) => {
        ffmpeg(videoPath)
            .inputOptions('-stream_loop', '-1') // Loop indefinitely
            .outputOptions(`-t ${audioDuration}`) // Set duration to match audio
            .output(outputLoopedVideoPath)
            .on('end', () => {
                debugLog(`Looped video saved: ${outputLoopedVideoPath}`);
                resolve(outputLoopedVideoPath);
            })
            .on('error', (err) => {
                debugLog(`Error looping video: ${err.message}`);
                reject(err);
            })
            .run();
    });
}

/**
 * Merge the video with the audio file.
 * 
 * @param {string} videoPath - Path to the video file.
 * @param {string} audioPath - Path to the audio file.
 * @param {string} outputVideoWithAudioPath - Path to save the final output video.
 * @returns {Promise} - Resolves when the video and audio are merged.
 */
function mergeAudioVideo(videoPath, audioPath, outputVideoWithAudioPath) {
    debugLog(`Merging video and audio: ${videoPath} + ${audioPath}`);
    return new Promise((resolve, reject) => {
        ffmpeg()
            .input(videoPath)
            .input(audioPath)
            .outputOptions('-c:v', 'copy') // Copy video codec
            .outputOptions('-c:a', 'aac') // Encode audio as AAC
            .output(outputVideoWithAudioPath)
            .on('end', () => {
                debugLog(`Merged video saved: ${outputVideoWithAudioPath}`);
                resolve(outputVideoWithAudioPath);
            })
            .on('error', (err) => {
                debugLog(`Error merging audio and video: ${err.message}`);
                reject(err);
            })
            .run(); // Execute the command
    });
}

/**
 * Cleanup temporary files.
 * 
 * @param {Array<string>} files - Array of file paths to delete.
 */
function cleanUp(files) {
    debugLog('Cleaning up temporary files: ', files);
    files.forEach((file) => {
        fs.unlink(file, (err) => {
            if (err) {
                debugLog(`Error deleting file: ${file} - ${err.message}`);
            } else {
                debugLog(`Deleted file: ${file}`);
            }
        });
    });
}
export function concatenateVideos(videoPaths, outputPath) {
  return new Promise((resolve, reject) => {
    const fileListPath = path.join(process.cwd(), 'public', `filelist-${uuidv4()}.txt`);


    // Create a text file that lists all the video paths to concatenate
    const fileListContent = videoPaths.map(video => `file '${video}'`).join('\n');
    fs.writeFileSync(fileListPath, fileListContent);


    // Use fluent-ffmpeg to concatenate the videos
    ffmpeg()
      .input(fileListPath)
      .inputOptions('-f', 'concat', '-safe', '0')
      .outputOptions('-c:v', 'copy') // Copy the video codec
      .outputOptions('-c:a', 'aac') // Re-encode audio to ensure proper mixing
      .on('end', () => {
        fs.unlinkSync(fileListPath); // Clean up the temporary file list
        resolve(outputPath);
      })
      .on('error', (err) => {
        fs.unlinkSync(fileListPath); // Clean up even if there's an error
        reject(err);
      })
      .save(outputPath);
  });
}
/**
 * Main processing function to orchestrate the media processing.
 * 
 * @param {Request} req - The incoming request.
 * @param {Response} res - The outgoing response.
 */

export default async function handler(req, res) {

    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
  
    const { audio, video } = req.body;

  
    if (!audio || !video || audio.length !== video.length || audio.length !== 4) {
      return res.status(400).json({ message: "Four audio and video pairs are required" });
    }
  
    const tempFilePaths = [];
    const mergedVideoPaths = [];
  
    try {
      for (let i = 0; i < audio.length; i++) {
        // Generate temporary filenames for audio and video
        const audioFileName = `audio-${uuidv4()}.mp3`;
        const audioFilePath = path.join(process.cwd(), 'public', audioFileName);
        const videoFileName = `video-${uuidv4()}.mp4`;
        const videoFilePath = path.join(process.cwd(), 'public', videoFileName);
        const outputVideoWithAudioPath = path.join(process.cwd(), 'public', `output-${uuidv4()}.mp4`);
        const outputLoopedVideoPath = path.join(process.cwd(), 'public', `looped-${uuidv4()}.mp4`);
  
        // Save audio from base64
        const base64Audio = audio[i].replace(/^data:application\/octet-stream;base64,/, "");
        fs.writeFileSync(audioFilePath, base64Audio, { encoding: 'base64' });
  
        // Download the video from the provided URL and save it
        const response = await axios({
          url: video[i],
          method: 'GET',
          responseType: 'stream',
        });
  
        const videoStream = fs.createWriteStream(videoFilePath);
        await new Promise((resolve, reject) => {
          response.data.pipe(videoStream);
          videoStream.on('finish', resolve);
          videoStream.on('error', reject);
        });
  
        // Get the duration of both audio and video
        const videoDuration = await getDuration(videoFilePath);
        const audioDuration = await getDuration(audioFilePath);
  
        let finalVideoPath = videoFilePath;
  
        // If the audio is longer than the video, loop the video
        if (audioDuration > videoDuration) {
          finalVideoPath = await loopVideo(videoFilePath, audioDuration, outputLoopedVideoPath);
        }
  
        // Merge the final video (looped if needed) with the audio
       const merge_audio=await mergeAudioVideo(finalVideoPath, audioFilePath, outputVideoWithAudioPath);
       console.log("merge_audio",merge_audio)

  
        // Store the merged video path for concatenation later
        mergedVideoPaths.push(outputVideoWithAudioPath);
  
        // Add temporary paths to cleanup later
        tempFilePaths.push(audioFilePath, videoFilePath);
        if (finalVideoPath !== videoFilePath) {
          tempFilePaths.push(finalVideoPath); // Add looped video if it was created
        }
      }

  
      // Now concatenate all the merged videos into one
      const finalConcatenatedVideoPath = path.join(process.cwd(), 'public', `final-output-${uuidv4()}.mp4`);
      await concatenateVideos(mergedVideoPaths, finalConcatenatedVideoPath);
  
      // Cleanup temporary files
      // tempFilePaths.forEach(filePath => fs.unlinkSync(filePath));
      // mergedVideoPaths.forEach(filePath => fs.unlinkSync(filePath));
  
      // Return the final concatenated video without the /public/ prefix
      res.status(200).json({ 
        message: "Processing complete", 
        url: `/${path.basename(finalConcatenatedVideoPath)}` // Remove /public from the URL
      });
    } catch (error) {
      console.error("Error processing media:", error);
      res.status(500).json({ message: "Error processing media", error: error.message });
    }
  }
