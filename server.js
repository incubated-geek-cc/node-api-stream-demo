const express = require('express');
const app = express();
const port = 9000;

const fs = require('fs');
const path = require('path');

// app.get('/', (req, res) => {
// 	res.send('Hello World');
// });

app.get('/', (req, res) => {
  var filepathToStream = path.join(__dirname, 'leaf.png');
  var readStream = fs.createReadStream(filepathToStream);

  readStream
  .on('open', () => {
    readStream.pipe(res);
  })
  .on('error', (err_msg) => {
  	console.log(err_msg);
  	res.end(err_msg);
  });
});

app.get('/leaf', (req, res) => {
  var filepathToStream=path.join(__dirname, 'leaf.png');
  var readStream = fs.createReadStream(filepathToStream);

  readStream
  .on('data', (chunk) => {
    res.write(chunk);
  })
  .on('error', (err_msg) => {
    console.log(err_msg);
    res.end(err_msg);
  })
  .on('end', () => {
      res.end();
  });
});


app.get('/download_leaf', (req, res) => {
  var allChunks=[];

  var filepathToStream=path.join(__dirname, 'leaf.png');
  var readStream = fs.createReadStream(filepathToStream);

  readStream
  .on('data', (chunk) => {
    allChunks=allChunks.concat(chunk);
  })
  .on('error', (err_msg) => {
    console.log(err_msg);
    res.end(err_msg);
  })
  .on('end', () => {
      var b64URI = 'data:image/png;base64,'+Buffer.from(allChunks[0]).toString('base64');
      var downloadLink="<a href='"+b64URI+"' download='leaf.png' target='_blank'>Download leaf.png</a>";

      res.send(downloadLink);

      console.log('end');
  });
});

app.listen(port, () => {
	console.log(`App is listening at http://localhost:${port}`)
});