const bodyparser = require("body-parser");
const morgan = require("morgan");
const express = require("express");
const multer = require("multer");
const cors = require("cors");

const upload = multer({ dest: 'public/' });
const app = express();

var corsOptions = {
    credentials: true,
    // origin: "http://localhost:3000",
    origin: "https://xrp-marketplace-backend.vercel.app/api",
};
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

const mongoose = require("mongoose");

const NFTModel = require('./model/model.js');

const MONGODB_URI = "mongodb+srv://vercel-admin-user-64078ccf3f79391698b130d1:ApH30bpK6LZW1QJZ@xrpl-cluster.j3xqx9d.mongodb.net/nftDB?retryWrites=true&w=majority"

app.post("/api/create/", upload.single('image'), async (req, res) => {
    let imageName = req.file.filename;
    const imagePath = `localhost:3000/${imageName}`;
    mongoose.connect(MONGODB_URI);
    const db = mongoose.connection;
    db.on("error", (error) => {
        res.send(error);
    });
    db.once("open", async () => {

        let newNFT = {
            nftImgPath: imagePath,
            nftName: req.body.nftName,
            nftDescription: req.body.nftDescription,
            nftProperties: req.body.nftDescription
        };

        let nft = new NFTModel(newNFT);
        try {
            await nft.save();
            res.send("NFT info saved");
        } catch (error) {
            res.status(500).send(error);
        }
    })
})

module.exports = app;