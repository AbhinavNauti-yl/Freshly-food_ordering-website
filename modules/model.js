const mongoose = require("mongoose")    //requiring mongoose

//defining the schema in which data is being stored
const schema = mongoose.Schema({
    name: String,
    phone: Number,
    email: String,
    password: Number
})

const Person = new mongoose.model("Person", schema)   //crating model

//exporting the model Person
module.exports = Person