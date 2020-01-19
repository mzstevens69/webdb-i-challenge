const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use("/accounts", db);

server.get("/", (req, res) => {
    res.send("<h1>Db one working</h1>")
})
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        message: "There was an error"
    })
})




module.exports = server;