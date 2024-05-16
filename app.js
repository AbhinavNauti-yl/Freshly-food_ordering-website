const experess = require("express")
const path = require("path")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")

//connnecting the server to the mongodb server
mongoose.connect('mongodb://127.0.0.1:27017/freshly_signup2').then(() => {
    console.log("connected")
}).catch((err) => {
    console.log(err)
})

const Person = require("./modules/model")   //requiring th Person model into the api

const app = experess()

app.set("view engine", "pug") // setting view engine from html to pug
app.set("views", path.join(__dirname, "views")) //setting views directory
app.use("/static", experess.static("static"))  //setting static files
app.use("/images", experess.static("images"))  //including images folder
app.use(bodyparser.urlencoded({ extended: false }))  //for entering data into the mongo database

//for localhost or home page
app.get("/", (req, res) => {
    res.render("index")
})

//for innitial home page of the website
app.get("/index", (req, res) => {
    res.render("index")
})

//for about section of the website
app.get("/about_us", (req, res) => {
    res.render("about_us")
})

//for signup page of the website
app.get("/signup", (req, res) => {
    res.render("signup")
})

//for login page of the website
app.get("/login", (req, res) => {
    res.render("login")
})


//for sigining up to the website using post method
app.post("/signup", async (req, res) => { //saving data to mongodb
    try {
        const em = await Person.findOne({ email: req.body.email })
        console.log(em)
        if (em) {
            res.send("<h1>E-mail allready exist</h1>")
        } else {
            await Person.create({
                name: req.body.name,
                phone: req.body.phone_number,
                email: req.body.email,
                password: req.body.password
            }).then(() => {
                console.log("data entered succesfully")
            }).catch((err) => {
                console.log(err)
            })
            res.render("index")
        }
    } catch (error) {
        console.log(error)
    }
})


//for loging in to the website using post method
app.post("/login", async (req, res) => {
    try {
        const em = await Person.findOne({ email: req.body.email, password: req.body.password })
        console.log(em)
        if (em) {
            res.send("<h1>Loged in</h1>")
        } else {
            res.send("<h1>The password and email dose not match</h1>")
        }
    } catch (error) {
        console.log(error)
    }
})

//starting the server on port 80
app.listen(80, () => {
    console.log("Running")
})