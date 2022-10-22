const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConn')
require('dotenv').config()
const path = require('path')
const corsOptions = require('./config/corsOptions')
const app = express()
const PORT = process.env.PORT || 5000

connectDB()
app.use(express.json())
app.use(cors())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    )
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root'))
app.use('/v/', require('./routes/links-router'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', (err) => {
    console.log(err)
    logEvents(
        `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
        'mongoErrLog.log'
    )
})
