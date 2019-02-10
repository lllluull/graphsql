const express = require('express')
const app = express()
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')


app.use(cors())


mongoose.connect('mongodb://lllluull:llll2004@ds135519.mlab.com:35519/lllluull', {useNewUrlParser: true})
mongoose.connection.once('open', () => console.log('连接数据库'))

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(8080,() => console.log('8080端口启动啦'))