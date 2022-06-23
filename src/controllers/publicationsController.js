const publicationsController = require(`express`).Router()
const { createPublication, getOne, getOneDetailed } = require(`../services/publicationService`)
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
        res.render(`publications/create`, { error })
    }
})

publicationsController.get(`/details/:publicationId`, async (req, res) => {
    const publicationId = req.params.publicationId
    const currentPublication = await getOneDetailed(publicationId, "author").lean()
    const publicationAuthor = currentPublication.author._id
    const currentUser = req.user?.user._id
    const isAuthor = publicationAuthor == currentUser

    res.render(`publications/details`, { ...currentPublication, isAuthor, currentUser })
})



module.exports = publicationsController
