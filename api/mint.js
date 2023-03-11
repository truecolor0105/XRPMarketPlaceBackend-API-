const app = require("express")();
const xrpl = require("xrpl");
const localStorage = require("localStorage");

const { NET, WALLETADDRESS } = require("./user/user.js");

app.post("/api/mint/", async (req, res) => {
    try {
        //get the information for mintTx
        let uri = xrpl.convertStringToHex(req.body.uri);
        let royal = req.body.royal;
        let mintFee = req.body.mintFee;
        //create mintTx
        const mintTx = {
            "TransactionType": "NFTokenMint",
            "Account": WALLETADDRESS,
            "TransferFee": royal,
            "NFTokenTaxon": 0,
            "Flags": 8,
            "Fee": mintFee,
            "URI": uri
        }
        //Occur Tx
        const client = new xrpl.Client(NET);
        await client.connect();
        const tx = await client.submitAndWait(mintTx, { wallet: walletAddress });
        //get the nfts owned by account
        const nfts = await client.request({
            method: "account_nfts",
            account: walletAddress
        })
        res.send(nfts);
    } catch (error) {
        res.send(error);
    }
})

module.exports = app;