const router = require("express").Router()
const homeController = require(`./src/controllers/homeController`)
const authController = require(`./src/controllers/authController`)
const galleryController = require(`./src/controllers/galleryController`)
const publicationsController = require(`./src/controllers/publicationsController`)


router.get(`/`, homeController)
router.get(`/gallery`, galleryController)
router.use(`/publications`, publicationsController)
router.use(`/auth`, authController)
router.get(`/404`, (req, res)=>{res.render(`404`)})



module.exports = router