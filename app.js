const experess=require("express")
const path=require("path")

const app=experess()

app.set("view engine","pug") // setting view engine from html to pug
app.set("views",path.join(__dirname,"views")) //setting views directory
app.use("/static",experess.static("static"))  //setting static files
app.use("/images",experess.static("images"))  //including images folder

app.get("/",(req,res)=>{
    res.render("index")
})

app.get("/index",(req,res)=>{
    res.render("index")
})

app.get("/about_us",(req,res)=>{
    res.render("about_us")
})

app.listen(80,()=>{
    console.log("running")
})