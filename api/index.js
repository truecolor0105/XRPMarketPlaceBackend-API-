const express = require("express");
const app = express();

app.use(express.static('../public'));

app.get("/api/", (req, res) => {
    res.send("Hello James");
});

module.exports = app;