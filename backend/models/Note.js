const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({

leadId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Lead"
},

noteText:String,

createdBy:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

date:{
type:Date,
default:Date.now
}

})

module.exports = mongoose.model("Note",noteSchema)