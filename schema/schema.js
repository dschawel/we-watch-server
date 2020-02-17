const graphql = require('graphql')
const _ = require('lodash')
const Show = require('../models/show')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

// Constructing movie object type
const ShowType = new GraphQLObjectType({
    name: 'Show',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        year: { type: GraphQLInt },
        poster: { type: GraphQLString },
        // resolve(parent, args) {
        //     // return _.find(users, { id: parent.userId } )
        //     return Show.findById(args.id)
        // }   
    })
})

// Constructing the root query for GraphQL
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        show: {
            type: ShowType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from database
                // return _.find(shows, { id: args.id })
                return Show.findById(args.id)
            }
        },
        shows: {
            type: new GraphQLList(ShowType),
            resolve(parent, args) {
                // return shows
                return Show.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addShow: {
            type: ShowType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                year: { type: GraphQLInt },
                poster: { type: GraphQLString },
            },
            resolve(parent, args) {
                let show = new Show({
                    name: args.name,
                    genre: args.genre,
                    year: args.year,
                    poster: args.poster,
                })
                return show.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})