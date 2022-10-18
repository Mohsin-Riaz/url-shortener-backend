const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
require('dotenv').config()
const path = require('path')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

connectDB()
app.use('/', require('./routes/root'))
app.use('/', express.static(path.join(__dirname, 'public')))

const linksRouter = require('./routes/links-router.js')

app.use('/v/', linksRouter)

mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
