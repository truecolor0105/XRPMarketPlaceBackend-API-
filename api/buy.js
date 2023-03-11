const app = require("express")();
const xrpl = require("xrpl");
const { NET, WALLETADDRESS } = require("./user/user.js");

app.post("/api/sell/", async (req, res) => {
    //To sell a NFT, you can use NFTTokenCreateOffer by setting tfSellToken flag.
    //get the info for sell transaction.
    let nftId = req.body.nftId;
    let amount = req.body.amount;
    //create Tx
    let expirationDate = null
    const transactionBlob = {
        "TransactionType": "NFTokenCreateOffer",
        "Account": WALLETADDRESS,
        "Owner": standbyOwnerField.value,
        "NFTokenID": nftId,
        "Amount": amount,
        "Flags": null
    }
    if (expirationDate != null) {
        transactionBlob.Expiration = expirationDate
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
        let nftBuyOffers;
        nftBuyOffers = await client.request({
            method: "nft_buy_offers",
            nft_id: nftId
        });
    } catch (err) {
        //no buy offer error
        res.send(err);
    }

    res.send(nftBuyOffers);
})

module.exports = app;