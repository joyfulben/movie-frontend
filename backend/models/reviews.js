const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    Title: {type: String},
    Released: {type: Number},
    Rated: {type: String},
    Genre: {type: String},
    Director: {type: String},
    Actors: [{type: String}],
    Plot: {type: String},
    Poster: {type: String}
})

module.exports = mongoose.model('Review', reviewSchema )
