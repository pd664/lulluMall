const express = require('express')
const app = express()
const mongoose = require('mongoose')
const ParityPreviousResult = require('../schema/paritySchema')

app.post('/getParityResult',async (req, res) => {
    console.log('/getParityResult')
    await ParityPreviousResult.find({})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log('error')
    })
})

module.exports = app