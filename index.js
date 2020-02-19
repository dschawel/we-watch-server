// Require needed packages
require('dotenv').config()
let cors = require('cors')
let express = require('express')
let expressJwt = require('express-jwt')
// let graphqlHTTP = require('express-graphql')
let morgan = require('morgan')
let rowdyLogger = require('rowdy-logger')

const bodyParser = require('body-parser')

// let schema = require('./schema/schema')

// Instantiate app
let app = express()
let rowdyResults = rowdyLogger.begin(app)

// Set up middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.urlencoded({ extended: false })) // Accept form data
app.use(express.json()) // Accept data from fetch (or any AJAX call)

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// Routes
// app.use('/graphql', graphqlHTTP({
//   schema,
//   graphiql: true
// }))

app.use('/auth', expressJwt({ 
  secret: process.env.JWT_SECRET
  }).unless({ // unless defines exceptions to the rule
    path: [
    { url: '/auth/login', methods: ['POST'] },
    { url: '/auth/signup', methods: ['POST'] }
  ]
}), require('./controllers/auth'))

app.use('/shows', expressJwt({
  secret: process.env.JWT_SECRET
}), require('./controllers/shows'))

app.use('/friends', expressJwt({
  secret: process.env.JWT_SECRET
}), require('./controllers/friends'))

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' })
})

app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print()
})
