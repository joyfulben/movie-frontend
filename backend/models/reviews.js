const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    title: {type: String},
    released: {type: Number},
    rated: {type: String},
    genre: {type: String},
    director: {type: String},
    actors: [{type: String}],
    plot: {type: String},
    poster: {type: String}
})

module.exports = mongoose.model('Review', reviewSchema )
