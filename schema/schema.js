const graphql = require('graphql')
const _ = require('lodash')

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql

let movies = [
    { title: 'Star Wars', genre: 'Sci-Fi', id: '1', userId: '1' },
    { title: 'Knives Out', genre: 'Mystery', id: '2', userId: '2' },
    { title: 'Titanic', genre: 'Romance', id: '3', userId: '2'},
    { title: 'Lion King', genre: 'Animated', id: '4', userId: '1'}
]


let users = [
    { name: 'David', age: 33, id: '1'},
    { name: 'Ashley', age: 42, id: '2'}
]

// Constructing movie object type
const MovieType = new GraphQLObjectType({
    name: 'Movie',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        genre: { type: GraphQLString },
        user: {
            type: UserType,
            resolve(parent, args) {
                console.log(parent)
                return _.find(users, { id: parent.userId } )
            }
        }
    })
})

// Constructing user object type
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        movie: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return _.filter(movies, { userId: parent.id })
            }
        }
    })
})

// Constructing the root query for GraphQL
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        movie: {
            type: MovieType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                args.id
                // code to get data from database
                return _.find(movies, { id: args.id })
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                args.id
                // code to get data from database
                return _.find(users, { id: args.id })
            }
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return users
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})