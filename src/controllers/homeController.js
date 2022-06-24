const { getAll } = require("../services/publicationService")

const homeController = async (req, res) => {

const publications = await getAll().lean()

publications.map(x=>{x.shares = x.userShared.length})  

res.render("./home", {publications})
}
module.exports = homeController

