let db = require('../models')
let router = require('express').Router()
const axios = require('axios')

router.get('/:query', (req, res) => {
    let q = JSON.stringify(req.params.query)
    console.log(q)
    axios.get(`http://www.omdbapi.com/?s=${q}&apikey=${process.env.OMDB_API_KEY}`, (error, response, body) => {
    if (error) {
        return res.send('error')
        }
    })
    .then(response => {
        // console.log(response.data)
        res.send(response.data)
    })
    // res.render('home', { 
    //     movies: data.Search || [], 
    //     total: data.totalResults || 0,
    //     q: q
    //     })
})

// Show all shows associated with a user
router.get('/', (req, res) => {
    db.Show.find({ user: req.user._id })
    .then((shows) => {
        if (!shows) {
            return res.status(404).send({ message: 'No Shows' })
        } else {
            return res.status(200).send(shows)
        }
    })
    .catch(err => {
        console.log('error', err)
    })
})

// Add a show 
router.post('/', (req, res) => {
    db.Show.create({
        title: req.body.title,
        // genre: req.body.genre,
        year: req.body.year,
        poster: req.body.poster,
        type: req.body.type,
        user: req.user._id
    })
    .then(newShow => {
        res.send({ newShow })
    })
    .catch(err => {
        console.log('error', err)
    })
})

// Delete a show
router.delete('/:showId', (req, res) => {
    db.Show.remove({ user: req.user._id, _id: req.params.showId })
    .then(() => {
        console.log('success?')
        res.send({message: 'Success'})
    })
    .catch(err => {
        console.log('Error when deleting show')
        res.status(500).send({ message: 'Server error' })
    })

})


module.exports = router