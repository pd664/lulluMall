const mongoose = require('mongoose')

const credentialSchema = mongoose.Schema({
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    userId: {type: String, required: true},
    balance: {type: Number, value:5000}
})

module.exports = mongoose.model('Credentials', credentialSchema)