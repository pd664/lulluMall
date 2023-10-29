const mongoose = require('mongoose')

const previousResult = mongoose.Schema({
    period_num: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    winNum: {type: Number, required: true}
})

module.exports = mongoose.model('saprePreviousResult',previousResult)