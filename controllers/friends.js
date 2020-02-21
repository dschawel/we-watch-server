let db = require('../models')
let router = require('express').Router()
let jwt = require('jsonwebtoken')

router.get('/', (req, res) => {
    db.User.findOne({_id : req.user._id}).populate('friends')
    .then(User => {
        console.log(User.firstname, User.lastname)
        console.log(User.friends)
        res.send({friends: User.friends})
    })
})

router.get('/:_id', (req, res) => {
    db.User.findOne({_id: req.params._id})
    .then(friend => {
        console.log('Found friend', friend)
        db.Show.find({ user: friend._id })
        .then((show) => {
            console.log('Found show:', show)
            res.send({show, friend})
        })
    })
})

let checkFriends = (foundId, arr) => {
    for(let i = 0; i < arr.length; i++){
        if (arr[i] == foundId){
            return true
        }
    }
    return false
}

router.post('/search', (req, res) => {
    let searchFriend = req.body.friendName
    //Hacky bit here, not scalable: this takes strictly a FIRSTNAME_LASTNAME situation and makes that work.
    //This whole situation basically justifies the use of username / email instead of searching by actual name.
    nameArr = searchFriend.split(' ')
    //Find the current user. This is needed in order to reassign the token once we're done.
    //Here we're finding the target user
    db.User.findOne({$and: [{ firstname: nameArr[0] }, {lastname: nameArr[1]}]})
    .then(found => {
        if (!found) {
            res.status(404).send({ message: 'No one matches that name'})
        }
        else if(checkFriends(found._id, req.user.friends) == true){
            res.send({message: 'Already a friend!'})
        } 
        else {
            db.User.findOneAndUpdate({_id: req.user._id}, { $push: { friends: found._id } })
            .then(user => {
                let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 1
                })
                res.status(200).send({token})
            })
        }
    })
})


module.exports = router