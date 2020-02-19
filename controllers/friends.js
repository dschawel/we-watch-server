let db = require('../models')
let router = require('express').Router()

// router.get('/search', (req, res) => {
//     console.log('Hitting the get route for search?')
//     db.User.find({ firstname: req.user.firstname })
//     if (!user) {
//         res.status(404).send({ message: 'No one matches that name'})
//     } else {
//         res.status(200).send(user)
//     }
// })

router.post('/search', (req, res) => {
    console.log('Hitting the post route for search?')
    let searchFriend = req.user.firstname
    // if (searchFriend == req.user.firstname) {
    //     searchFriend = null
    // }
    db.User.findOne({ firstname: searchFriend })
    if (!searchFriend) {
        res.status(404).send({ message: 'No one matches that name'})
    } else {
        res.status(200).send(searchFriend)
    }
})

module.exports = router