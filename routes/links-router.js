const { Router } = require('express');
const express = require('express');
const app = express();
const {
    createLink,
    deleteLink,
    getLinks,
    getLinkById,
} = require('../controllers/links-control');

app.use(Router);
const router = express.Router();

router.route('/get').get(getLinks);
router.route('/post').post(createLink);
router.route('/v/:id').get(getLinkById).delete(deleteLink);

module.exports = router;
