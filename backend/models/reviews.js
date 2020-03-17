const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    title: {type: String},
    release_date: {type: String},
    overiew: {type: String},
    poster_path: {type: String}
})

module.exports = mongoose.model('Review', reviewSchema )
