const express = require('express');
const app = express();
const port = 9000;

const fs = require('fs');
const path = require('path');

// app.get('/', (req, res) => {
// 	res.send('Hello World');
// });

app.get('/', (req, res) => {
	var filepathToStream=path.join(__dirname, 'leaf.png');
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

app.listen(port, () => {
	console.log(`App is listening at http://localhost:${port}`)
});