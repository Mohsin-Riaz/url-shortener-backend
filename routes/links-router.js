const { Router } = require('express')
const express = require('express')
const app = express()
const {
    createLink,
    deleteLink,
    getLinks,
    getLinkById,
} = require('../controllers/links-control')

app.use(Router)
const router = express.Router()

router.route('/').get(getLinks).delete(deleteLink)
router.route('/:shortURL').get(getLinkById).post(createLink)

module.exports = router
