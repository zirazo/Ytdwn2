const express = require('express');
const ytdl = require('ytdl-core');
const progress = require('progress');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/download', async (req, res) => {
  const { url, format } = req.query;

  try {
    const info = await ytdl.getInfo(url);
    const videoFormat = ytdl.chooseFormat(info.formats, { quality: format });

    const totalSize = parseInt(videoFormat.contentLength, 10);
    const progressBar = new progress('[:bar] :percent :etas', {
      total: totalSize,
      width: 20,
      clear: true,
    });

    res.header('Content-Disposition', `attachment; filename="${info.title}.${videoFormat.container}"`);
 const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://ytstream-download-youtube-videos.p.rapidapi.com/dl',
  params: {id: videoId},
  headers: {
    'X-RapidAPI-Key': '992c4a3c24msh3e40565ff4702eap152816jsn207591b3f6bb',
    'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
    ytdl(url, { format: videoFormat })
      .on('progress', (chunkLength, downloaded, total) => {
        progressBar.tick(chunkLength);
      })
      .on('end', () => {
        progressBar.complete();
      })
      .pipe(res);
  } catch (error) {
    res.status(500).send('Error downloading video.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
