const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
    nftImgPath: {
        type: String,
        require: true
    },
    nftName: {
        type: String,
        required: true,
    },
    nftDescription: {
        type: String,
        required: true,
    },
    nftProperties: {
        type: Object,
        required: true,
    },
});

const NFTModel = mongoose.model("NFTS", NFTSchema);

module.exports = NFTModel;