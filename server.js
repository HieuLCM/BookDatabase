const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const app = express()

// allow origin-across request
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.8fdzj.mongodb.net/${process.env.CLUSTER_NAME}?retryWrites=true&w=majority`)
mongoose.connection.once('open', () => {
    console.log('Connected to database')
})

app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true
}))

app.listen(5000, () => {
    console.log('Server is running')
})

