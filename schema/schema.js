// const graphql = require('graphql')
// const _ = require('lodash')
// const Show = require('../models/show')
// const User = require('../models/user')

// const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql
// // Constructing movie object type
// const ShowType = new GraphQLObjectType({
//     name: 'Show',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         genre: { type: GraphQLString },
//         year: { type: GraphQLInt },
//         poster: { type: GraphQLString },
//         // user: {
//         //     type: UserType,
//             // resolve(parent, args) {
//             //     // console.log(parent)
//             //     // return _.find(users, { id: parent.userId } )
//             //     return Show.find(args.id)
//             // }   
//     })
// })
// // Constructing user object type
// const UserType = new GraphQLObjectType({
//     name: 'User',
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         show: {
//             type: new GraphQLList(ShowType),
//             resolve(parent, args) {
//                 // return _.filter(shows, { userId: parent.id })
//                 return Show.find({ userId: parent.id })
//             }
//         }
//     })
// })

// // Constructing the root query for GraphQL
// const RootQuery = new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: {
//         show: {
//             type: ShowType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 args.id
//                 // code to get data from database
//                 // return _.find(shows, { id: args.id })
//                 return Show.findById(args.id)
//             }
//         },
//         user: {
//             type: UserType,
//             args: { id: { type: GraphQLID } },
//             resolve(parent, args) {
//                 args.id
//                 // code to get data from database
//                 // return _.find(users, { id: args.id })
//                 return User.findById(args.id)
//             }
//         },
//         shows: {
//             type: new GraphQLList(ShowType),
//             resolve(parent, args) {
//                 // return shows
//                 return Show.find({})
//             }
//         }
//         // users: {
//         //     type: new GraphQLList(UserType),
//         //     resolve(parent, args) {
//         //         // return users
//         //         return User.find({})
//         //     }
//         // }
//     }
// })
// const Mutation = new GraphQLObjectType({
//     name: 'Mutation',
//     fields: {
//         addShow: {
//             type: ShowType,
//             args: {
//                 name: { type: GraphQLString },
//                 genre: { type: GraphQLString },
//                 year: { type: GraphQLInt },
//                 poster: { type: GraphQLString },
//                 userId: { type: GraphQLID }
//             },
//             resolve(parent, args) {
//                 let show = new Show({
//                     name: args.name,
//                     genre: args.genre,
//                     year: args.year,
//                     poster: args.poster,
//                     userId: args.userId
//                 })
//                 return show.save()
//             }
//         },
//         addUser: {
//             type: UserType,
//             args: {
//                 name: { type: GraphQLString },
//             },
//             resolve(parent, args) {
//                 let user = new User({
//                     name: args.name,
//                 })
//                 return user.save()
//             }
//         }
//     }
// })
// module.exports = new GraphQLSchema({
//     query: RootQuery,
//     mutation: Mutation
// })