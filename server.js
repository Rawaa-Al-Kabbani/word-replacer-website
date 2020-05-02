const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const path = require('path');
const port = 3000;
const readSort = require('./main').readSort;
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.post('/upload', function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e."userFile") is used to retrieve the uploaded file
  let userFile = req.files.userFile;

  readSort(userFile.data.toString()).then(function (data) {
    res.set('Content-Type', 'text/plain');
    res.send(data);
  });
});

app.listen(port);
