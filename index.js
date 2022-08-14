const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const jsQR = require("jsqr");
const Jimp = require('jimp');
const importData = require("./data.json");
let port = process.env.PORT || 3000;

// create application/json parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

const uploadImage = async (req, res, next) => {
    // to declare some path to store your converted image
    console.log(req.body.base64image);
    const imgData = JSON.stringify(req.body.base64image);
   
    Jimp.read(Buffer.from(imgData, 'base64'))// image path use path.join(__dirname,'/fileName')
    .then(image => {
    const code = jsQR(image.bitmap.data,image.bitmap.width,image.bitmap.height);

    if (code) {
    console.log("Found QR code", code);
    return res.send(code);
}

    })
    .catch(err => {
    // Handle an exception.
    console.log('QR code not found');
    });

    try {

    return res.send({"status":"success"});
    } catch (e) {
    next(e);
    }
    }

app.post('/upload/image', (req, res) => {
    console.log(req.body.base64image);
    const imgData = JSON.stringify(req.body.base64image);
   
    Jimp.read(Buffer.from(imgData, 'base64'))// image path use path.join(__dirname,'/fileName')
    .then(image => {
    const code = jsQR(image.bitmap.data,image.bitmap.width,image.bitmap.height);

    if (code) {
    console.log("Found QR code", code);
    return res.send(code);
}

    })
    .catch(err => {
    // Handle an exception.
    console.log('QR code not found');
    });
  });

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/players", (req, res) => {
    res.send(importData);
});

app.listen(port, () =>{
    console.log("example app listening on port http://localhost:${port}")
});

