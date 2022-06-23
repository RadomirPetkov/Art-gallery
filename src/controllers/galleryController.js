const {getAll} = require(`../services/publicationService`)

const galleryController = async (req, res) =>{
    const publications = await getAll().lean()
    res.render(`gallery`, {publications})
}

module.exports = galleryController