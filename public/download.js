// download.js
const express = require('express');
const ytdl = require('ytdl-core');
const progress = require('progress');
const router = express.Router();

router.get('/', async (req, res) => {
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

module.exports = router;
