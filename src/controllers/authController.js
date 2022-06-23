const authController = require(`express`).Router()
const authService = require(`../services/authService`)


authController.get(`/register`, (req, res) => {

    res.render("auth/register")
})

authController.post(`/register`, async (req, res)=>{
    const {username, password, repeatPassword, adress} = req.body
    if(password !== repeatPassword){
        return res.render(`auth/register`, {error: "Password doesnt match"})
    }

// const user = await authService.register(username, password, adress)
res.render(`home`)

})

authController.get(`/login`, (req, res) => {

    res.render("auth/login")
})


module.exports = authController

