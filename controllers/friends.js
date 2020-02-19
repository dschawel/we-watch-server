let db = require('../models')
let router = require('express').Router()

// router.get('/search', (req, res) => {
//     db.User.find({ firstname: req.user.firstname })
//     if (!user) {
//         res.status(404).send({ message: 'No one matches that name'})
//     } else {
//         res.status(200).send(user)
//     }
// })

router.post('/search', (req, res) => {
    console.log(req.body)
    let searchFriend = req.body.friendName
    nameArr = searchFriend.split(' ')
    console.log(nameArr)
    // if (searchFriend == req.user.firstname) {
    //     searchFriend = null
    // }
    db.User.findOne({$and: [{ firstname: nameArr[0] }, {lastname: nameArr[1]}]})
    .then(found => {
        if (!found) {
            res.status(404).send({ message: 'No one matches that name'})
        }
        else if(found._id in req.user.friends == true){
            res.send({message: 'Already a friend!'})
        } 
        else {
            console.log('logged in user: ', req.user)
            console.log('found user: ', found._id)
            db.User.updateOne({_id: req.user._id}, { $push: { friends: found._id } })
            .then(result => {
                res.status(200).send({message: 'User added: ', result})
            })
        }
    })
})





module.exports = router

//Take user input, format input into two separate variables