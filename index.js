const getPixels = require('get-pixels');
const express = require('express');

var app = express();

const getImgData = async (req, res, next) => {
  getPixels('72.jpg', function(err, pixels) {
    if (err) {
      console.log('Bad image path');
      return;
    }
    let data = [];
    let part = [];
    console.log(pixels.shape);
    for (let i = 0; i < pixels.shape[1]; i++) {
      for (let j = pixels.shape[0] * i; j < pixels.shape[0] * (i + 1); j++) {
        part.push([
          pixels.data[j],
          pixels.data[j + 1],
          pixels.data[j + 2],
          pixels.data[j + 3]
        ]);
      }
      // console.log(part);
      data.push(part);
      part = [];
      // console.log(data);
    }
    req.data = data;
    req.dataset = pixels.data;
    next();
  });
};

app.get('/', getImgData, (req, res) => {
  res.json(req.data);
});

app.listen(5000);
