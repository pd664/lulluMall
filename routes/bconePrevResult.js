const express = require('express')
const app = express()
const BconePreviousResult = require('../schema/bconeSchem')

app.post('/getBconeResult',async (req, res) => {
    console.log('/getBconeResult')
    await BconePreviousResult.find({})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log('error')
    })
})

module.exports = app