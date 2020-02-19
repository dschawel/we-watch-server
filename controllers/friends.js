let db = require('../models')
let router = require('express').Router()

router.get('/search', (req, res) => {
    db.User.find({ firstname: req.user.firstname })
    if (!user) {
        res.status(404).send({ message: 'No one matches that name'})
    } else {
        res.status(200).send(user)
    }
})

router.post('/search', (req, res) => {
    let searchFriend = req.body.searchFriend
    if (searchFriend == req.user.firstname) {
        searchFriend = null
    }
    db.User.find({ firstname: searchFriend })
    if (!user) {
        res.status(404).send({ message: 'No one matches that name'})
    } else {
        res.status(200).send(user)
    }
})





module.exports = router