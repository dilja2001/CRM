



const mongoose = require("mongoose")

const leadSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true   
},
phone:Number,
company:String,

status:{
type:String,
enum:["new","contacted","proposal","won","lost"],
default:"new"
},

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

assignedTo:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}

},{timestamps:true})

module.exports = mongoose.model("Lead",leadSchema)