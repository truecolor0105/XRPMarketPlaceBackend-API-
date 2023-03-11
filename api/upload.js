// import express from "express";
// import * as IPFS from 'ipfs-core';
// import fs from 'fs';
const express = require('express');
const cors = require("cors");
const multer = require('multer');

const upload = multer({ dest: 'images/' });

const app = express();

app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));

// app.post('/api/upload/', (req, res) => {
//     // const imagesDir = './src/images'

//     // const files = fs.readdirSync(imagesDir)
//     // const gateway = 'https://gateway.pinata.cloud/ipfs/'
//     // const ipfs = await IPFS.create()
//     // for (let file of files) {
//     //     const buffer = fs.readFileSync(`${imagesDir}/${file}`)
//     //     const result = await ipfs.add(buffer)
//     //     console.log(result)
//     //     console.log(gateway + result.path)
//     // }
//     if (!req.files) {
//         console.log(req)
//         return res.send("No image");
//     } else {
//         let files = req.files.images;
//         if (!Array.isArray(files)) {
//             files = [files];
//         }

//         for (let i = 0; i < files.length; i++) {
//             files[i].mv(`${__dirname}/../uploads/${files[i].name}`, function (err) {
//                 if (err) {
//                     res.send(err)
//                     return;
//                 }
//             })
//         }

//         return res.send({
//             success: true
//         })
//     }
// });

app.post('/api/upload', upload.single('image'), (req, res) => {
    const imageName = req.file.filename;
    const imagesDir = './src/images';


    // Save this data to a database probably
    console.log(req.body);
    res.send({ imageName })
})

module.exports = app;