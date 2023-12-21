// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const downloadRouter = require('./download');
app.use('/download', downloadRouter);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
