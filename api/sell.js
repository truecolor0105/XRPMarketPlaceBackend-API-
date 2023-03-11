const app = require("express")();
const xrpl = require("xrpl");
const { NET, WALLETADDRESS } = require("./user/user.js");

app.post("/api/sell/", async (req, res) => {
    //To sell a NFT, you can use NFTTokenCreateOffer by setting tfSellToken flag.
    //get the info for sell transaction.
    let nftId = req.body.nftId;
    let amount = req.body.amount;
    //create Tx
    let transactionBlob = {
        "TransactionType": "NFTokenCreateOffer",
        "Account": WALLETADDRESS,
        "NFTokenID": nftId,
        "Amount": amount,
        "Flags": 1
    }
    //occer tx
    try {
        const client = new xrpl.Client(NET);
        await client.connect();
        const tx = client.submitAndWait(transactionBlob, WALLETADDRESS);
    } catch (err) {
        //client connection error or occur tx error
        res.send(err);
    }
    try {
        let nftSellOffers;
        nftSellOffers = await client.request({
            method: "nft_sell_offers",
            nft_id: nftId
        });
    } catch (err) {
        //no nftselloffers error
        res.send(err);
    }

    res.send(nftSellOffers);
})

module.exports = app;