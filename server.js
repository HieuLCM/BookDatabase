const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

// allow origin-across request
app.use(cors())

mongoose.connect('mongodb+srv://hieulcm:Minhhieu1@cluster0.8fdzj.mongodb.net/Cluster0?retryWrites=true&w=majority')
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

