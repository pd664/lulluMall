const express = require('express')
const app = express()
const SaprePreviousResult = require('../schema/sapreSchema')

app.post('/getSapreResult',async (req, res) => {
    console.log('/getSapreResult')
    await SaprePreviousResult.find({})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log('error')
    })
})

module.exports = app