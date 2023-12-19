// _document.js

import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon/favicon-32x32.png" type="image/png" />
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="theme-color" content="#3498db" />
          <meta name="description" content="Download YouTube videos with this simple YouTube Downloader. Choose the quality and start downloading." />
          <link rel="stylesheet" href="/index.css" />
          <title>YouTube Video Downloader</title>
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5148949743697465" crossOrigin="anonymous"></script>
          {/* Google tag (gtag.js) */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-JDQE45L8V1"></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JDQE45L8V1');
            `,
          }} />
        </Head>
        <body>
          <div className="content-container">
            <h1>YouTube Video Downloader</h1>
            <form id="downloadForm" action="/download" method="get" onSubmit={showThumbnailAndTitle}>
              <label htmlFor="url">YouTube URL:</label>
              <input type="text" id="url" name="url" required />
              <br />
              <label htmlFor="format">Choose Format:</label>
              <select id="format" name="format" required>
                <option value="highest">Highest Quality</option>
                <option value="lowest">Lowest Quality</option>
              </select>
              <br />
              <button type="submit">Download</button>
            </form>
            <div id="thumbnail-container"></div>
            <div id="title-container"></div>
          </div>
          <footer>
            <p style={{ fontWeight: 'bold', fontSize: '30px' }}>Free Online YouTube Video Downloader</p>
            <p>Youtube Video Downloader is a free Online tool to download videos from Youtube. Download Youtube Videos in MP4 HD quality & 720P format using Youtube video download. Youtube video downloader is free tool to download any Youtube videos, file, media & resume online.</p>
            <p>download-youtube-video.com is a website that helps you save your favorite Youtube videos online without software or extensions to your computer or mobile device (iOS & Android), it's also free to use and there's no limit on downloading videos.</p>
            <p>Youtube Downloader helps you download any Youtube video in the best quality. Download Youtube videos in MP3, MP4, 3GP, M4A, and many more formats. Our downloader is for free and does not require any software or registration.</p>
          </footer>
          <Main />
          <NextScript />
          <script src="/path/to/your/other/script.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
