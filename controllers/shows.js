let db = require('../models')
let router = require('express').Router()

router.get('/', (req, res) => {
    let q = req.body.q || 'star'
    console.log(q)
    request(`http://www.omdbapi.com/?s=${q}&apikey=${process.env.OMDB_API_KEY}`, (error, response, body) => {
    if (error) {
        return res.render('error')
    }
    console.log(JSON.parse(body))
    let data = JSON.parse(body)
    // res.send(data)
    res.render('home', { 
        movies: data.Search || [], 
        total: data.totalResults || 0,
        q: q
        })
    })
})

module.exports = router