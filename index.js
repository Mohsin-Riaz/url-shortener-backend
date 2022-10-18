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

// app.use('/', express.static(path.join(__dirname, 'public')))

mongoose.connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

const linksRouter = require('./routes/links-router.js')

app.use('/', linksRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
