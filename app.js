// app.js
const express = require('express');
const ytdl = require('ytdl-core');
const axios = require('axios');
const progress = require('progress');
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environment variables

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/download', async (req, res) => {
  const { url, format } = req.query;

  try {
    // Get video info using ytdl
    const info = await ytdl.getInfo(url);

    // Fetch video title from YouTube API
    const videoId = info.videoDetails.videoId;
    const apiKey = process.env.AIzaSyDF0UV7UA-XjlfViwiO_c3Ej0qIl51nG5o; // Use environment variable
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet`;

    const response = await axios.get(apiUrl);
    const videoTitle = response.data.items[0].snippet.title;

    // Choose video format
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: format });

    // Set response headers
    res.header('Content-Disposition', `attachment; filename="${videoTitle}.${videoFormat.container}"`);

    // Create progress bar
    const totalSize = parseInt(videoFormat.contentLength, 10);
    const progressBar = new progress('[:bar] :percent :etas', {
      total: totalSize,
      width: 20,
      clear: true,
    });

    // Pipe the video stream to the response
    ytdl(url, { format: videoFormat })
      .on('progress', (chunkLength, downloaded, total) => {
        progressBar.tick(chunkLength);
      })
      .on('end', () => {
        progressBar.complete();
      })
      .pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error downloading video.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
