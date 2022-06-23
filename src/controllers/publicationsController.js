const publicationsController = require(`express`).Router()

publicationsController.get(`/create`, (req, res)=>{
    res.render(`publications/create`)
})


module.exports = publicationsController
