const reviews = require('express').Router()
const Review = require('../models/reviews.js')

// Index
reviews.get('/', (req, res) => {
    Review.find({}, (error, foundReviews) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(foundReviews)
    })
})

// Create
reviews.post('/', async (req, res) => {
    Review.create(req.body, (error, createdReview) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).send(createdReview)
    })
})

// Delete
reviews.delete('/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id, (error, deletedReview) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(deletedReview)
    })
})

// Seed
reviews.get('/seed', (req, res)=>{
    Review.create([
        {
            Title: "Interstellar",
            Released: 2014,
            Rated: "PG-13",
            Genre: "Adventure",
            Director: "Christopher Nolan",
            Actors: "Ellen Burstyn, Matthew McConaughey, Mackenzie Foy, John Lithgow",
            Plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            Poster: "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg"
        }
    ], (error, data)=>{
        console.log(error);
        res.send(data);
    })
});

// update
reviews.put('/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedReview) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        res.status(200).json(updatedReview)
    })
})

module.exports = reviews
