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
        .outputOptions('-c', 'copy')  // Copy the codec for faster processing
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

  export default async function handler(req, res) {


    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
      }
    
      const { audio, video } = req.body;



      const audioFilePath = path.join(process.cwd(), 'public', audio);
      const videoFileName = `video-${uuidv4()}.mp4`;
      const videoFilePath = path.join(process.cwd(), 'public', videoFileName);

      const outputVideoWithAudioPath = path.join(process.cwd(), 'public', `finaloutput-${uuidv4()}.mp4`);
      const outputLoopedVideoPath = path.join(process.cwd(), 'public', `looped-${uuidv4()}.mp4`);


        // Download the video from the provided URL and save it
        const response = await axios({
            url: video,
            method: 'GET',
            responseType: 'stream',
          });
    
          const videoStream = fs.createWriteStream(videoFilePath);
          await new Promise((resolve, reject) => {
            response.data.pipe(videoStream);
            videoStream.on('finish', resolve);
            videoStream.on('error', reject);
          });
    

      const videoDuration = await getDuration(videoFilePath);
      const audioDuration = await getDuration(audioFilePath);

      let finalVideoPath = videoFilePath;

      if (audioDuration > videoDuration) {
        finalVideoPath = await loopVideo(videoFilePath, audioDuration, outputLoopedVideoPath);
      }

      await mergeAudioVideo(finalVideoPath, audioFilePath, outputVideoWithAudioPath);


      res.status(200).json({ 
        message: "Processing complete", 
        url: `/${path.basename(outputVideoWithAudioPath)}` // Remove /public from the URL
      });



  }