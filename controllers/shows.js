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
    res.send(JSON.stringify(response.data))
})
    // res.render('home', { 
    //     movies: data.Search || [], 
    //     total: data.totalResults || 0,
    //     q: q
    //     })
})


module.exports = router