const publicationsController = require(`express`).Router()
const { createPublication } = require(`../services/publicationService`)
const { isUser } = require(`../middlewares/authMiddleware`)

publicationsController.get(`/create`, isUser, (req, res) => {
    res.render(`publications/create`)
})

publicationsController.post(`/create`, isUser, async (req, res) => {
    const userId = req.user.user._id

    try {
        await createPublication({ ...req.body, author: userId })
        res.redirect(`/gallery`)
    } catch (error) {
        res.render(`publications/create`, {error})
    }
})

module.exports = publicationsController
