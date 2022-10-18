const { Router } = require('express')
const express = require('express')
const app = express()
const {
    createLink,
    deleteLink,
    getLinks,
    getLinkById,
    ignore,
} = require('../controllers/links-control')

app.use(Router)
const router = express.Router()

router.route('/').get(getLinks).delete(deleteLink)
router.route('/:shortURL').get(getLinkById).post(createLink)

router.route('/favicon.ico').get(ignore)
router.route('/static/js/main.c99f5e83.js').get(ignore)
router.route('/static/css/main.73470df5.css').get(ignore)

module.exports = router
