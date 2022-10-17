const Link = require('../models/links.model')

createLink = async (req, res) => {
    const { shortURL, longURL, qrCode } = req.body

    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'Please provide link',
        })
    }

    const link = new Link({ shortURL, longURL, qrCode })

    if (!link) {
        return res.status(400).json({ success: false, error: err })
    }

    const newLink = await link.save()

    if (newLink) {
        return res.status(201).json({
            success: true,
            id: link._id,
            data: newLink,
            message: 'Link created!',
        })
    } else {
        return res.status(400).json({
            error,
            message: 'Link not created!',
        })
    }
}

deleteLink = async (req, res) => {
    const { shortURL } = req.body

    if (!shortURL) {
        return res.status(404).json({
            success: false,
            error: 'Not found',
        })
    }

    const deletedLink = await Link.findOneAndDelete({ shortURL: shortURL })

    if (deletedLink) {
        return res.status(200).json({ success: true, message: `link deleted` })
    } else {
        return res.status(400).json({ success: false, error: error })
    }
}

getLinkById = async (req, res) => {
    const { shortURL } = req.params
    if (!shortURL) {
        return res.status(404).json({
            success: false,
            error: 'No id given',
        })
    }

    const newLink = await Link.findOne({ shortURL: shortURL }).exec()

    if (!newLink) {
        return res
            .status(404)
            .json({ success: false, message: 'Link not found' })
    }

    return res.redirect(newLink.longURL)
}

getLinks = async (req, res) => {
    const allLinks = await Link.find({}).lean().exec()

    if (!allLinks?.length) {
        return res
            .status(404)
            .json({ success: false, error: 'Links not found' })
    }

    res.status(200).json({ success: true, data: allLinks })
}

module.exports = {
    createLink,
    deleteLink,
    getLinks,
    getLinkById,
}
