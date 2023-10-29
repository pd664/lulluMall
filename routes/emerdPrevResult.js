const express = require('express')
const app = express()
const mongoose = require('mongoose')
const EmardPreviousResult = require('../schema/emardSchema')

app.post('/getEmerdResult',async (req, res) => {
    console.log('/getEmerdResult')
    await EmardPreviousResult.find({})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log('error')
    })
})

module.exports = app