let db = require('../models')
let router = require('express').Router()
let jwt = require('jsonwebtoken')

// router.get('/search', (req, res) => {
//     db.User.find({ firstname: req.user.firstname })
//     if (!user) {
//         res.status(404).send({ message: 'No one matches that name'})
//     } else {
//         res.status(200).send(user)
//     }
// })

router.get('/', (req, res) => {
    db.User.findOne({_id : req.user._id}).populate('friends')
    .then(User => {
        console.log(User.firstname, User.lastname)
        console.log(User.friends)
        res.send({friends: User.friends})
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
                console.log('big league:', user)
                let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
                    expiresIn: 60 * 60 * 1
                })
                res.status(200).send({token})
                
            })
        }
    })
})


// find the logged in user FIRST
//When you succeed in adding a friend, send token back (user altered)
// let token: string = jwt.sign(user.toJSON(), process.env.REACT_APP_JWT_SECRET, {
//     expiresIn: 60 * 60 * 1 //Expires in 1 hour
// })
//   res.send({ token })
// <-- Front end update token




module.exports = router

//Take user input, format input into two separate variables
