const router = require("express").Router()
const homeController = require(`./src/controllers/homeController`)

router.get(`/`, homeController)



module.exports = router