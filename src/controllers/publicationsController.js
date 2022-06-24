const publicationsController = require(`express`).Router()
const { createPublication, getOne, getOneDetailed, updateOne, deleteOne } = require(`../services/publicationService`)
const { isUser } = require(`../middlewares/authMiddleware`)

publicationsController.get(`/create`, isUser, (req, res) => {
    res.render(`publications/create`)
})

publicationsController.post(`/create`, isUser, async (req, res) => {
    const userId = req.user._id

    try {
        await createPublication({ ...req.body, author: userId })
        res.redirect(`/gallery`)
    } catch (error) {
        res.render(`publications/create`, { error })
    }
})

publicationsController.get(`/details/:publicationId`, async (req, res) => {
    const publicationId = req.params.publicationId
    const currentPublicationUnleaned = await getOne(publicationId)
    const currentPublication = await getOneDetailed(publicationId, ["author"]).lean()
    const publicationAuthor = currentPublication.author._id
    const currentUser = req.user?._id
    const isAuthor = publicationAuthor == currentUser
    const isShared = currentPublicationUnleaned.userShared.includes(currentUser)
    res.render(`publications/details`, { ...currentPublication, isAuthor, currentUser, isShared })
})

publicationsController.get(`/edit/:publicationId`, async (req, res) => {
    const publicationId = req.params.publicationId
    const currentPublication = await getOneDetailed(publicationId, "author").lean()

    res.render(`publications/edit`, currentPublication)

})

publicationsController.post(`/edit/:publicationId`, async (req, res) => {
    const currentPublication = req.body
    const publicationId = req.params.publicationId
    try {
        await updateOne(currentPublication, publicationId)
        res.redirect(`/publications/details/${publicationId}`)
    } catch (error) {
        res.render(`publications/edit`, { error })
    }

})

publicationsController.get(`/delete/:publicationId`, async (req, res) => {
    const publicationId = req.params.publicationId
    try {
        await deleteOne(publicationId)
        res.redirect(`/gallery`)

    } catch (error) {
        res.render(`404`)
    }

})

publicationsController.get(`/share/:publicationId`, async (req, res) => {
    const publicationId = req.params.publicationId
    const currentUser = req.user.user._id
    let currentPublication = await getOne(publicationId)
    currentPublication.userShared.push(currentUser)
    currentPublication.save()
    res.redirect(`/publications/details/${publicationId}`)

})

module.exports = publicationsController
