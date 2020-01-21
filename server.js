const express = require('express');

const db = require('./data/dbConfig.js');

const acctRouter = require("./accounts/accounts-router")

const server = express();

server.use(express.json());

server.use("/accounts", acctRouter);

server.get("/", (req, res) => {
    res.send("<h1>We are working now!</h1>")
})
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "There was an error"
    })
})




module.exports = server;