const mongoose = require(`mongoose`)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    myPublications:[{
        type: mongoose.Types.ObjectId,
        ref: 'Publication'
    }]
})

const User = mongoose.model(`User`, userSchema)

module.exports = User