const Link = require('../models/links.model');

const createLink = async (req, res) => {
    const { short_url, long_url } = req.body;

    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'Please provide link',
        });
    }

    const link = new Link({ short_url, long_url });

    if (!link) {
        return res.status(400).json({ success: false, error: err });
    }

    const newLink = await link.save();

    if (newLink) {
        return res.status(201).json({
            success: true,
            message: 'Link created!',
            data: {
                id: link._id,
                data: newLink,
            },
        });
    } else {
        return res.status(400).json({
            error,
            message: 'Link not created!',
        });
    }
};

const deleteLink = async (req, res) => {
    const { id: short_url } = req.params;

    if (!short_url) {
        return res.status(404).json({
            success: false,
            error: 'Not found',
        });
    }

    const deletedLink = await Link.findOneAndDelete({ short_url: short_url });

    if (deletedLink) {
        return res.status(200).json({ success: true, message: `link deleted` });
    } else {
        return res.status(400).json({ success: false, error: error });
    }
};

const getLinkById = async (req, res) => {
    const { id: short_url } = req.params;
    if (!short_url) {
        return res.status(404).json({
            success: false,
            error: 'No id given',
        });
    }

    const newLink = await Link.findOne({ short_url: short_url }).exec();

    if (!newLink) {
        return res
            .status(404)
            .json({ success: false, message: 'Link not found' });
    }

    return res.redirect(newLink.long_url);
};

const getLinks = async (req, res) => {
    const allLinks = await Link.find().sort({ createdAt: -1 }).lean().exec();
    if (!allLinks?.length) {
        return res
            .status(204)
            .json({ success: false, error: 'Links not found' });
    }

    res.status(200).json({ success: true, data: allLinks });
};

module.exports = {
    createLink,
    deleteLink,
    getLinks,
    getLinkById,
};
