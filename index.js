const express = require(`express`)
const cookieParser = require(`cookie-parser`)
const router = require(`./router`)
const app = express()
const { initializeDatabase } = require(`./config/database`)
const port = 5000
require(`./config/handlebars`)(app)
const {auth, isUser} = require(`./middlewares/authMiddleware`)


app.use("/", express.static("static"))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(auth, isUser)
app.use(router)

initializeDatabase()
    .then(
        app.listen(port, () => console.log(`App is listening on port ${port}`)))