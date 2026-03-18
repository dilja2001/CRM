const Note = require("../models/Note")

exports.addNote = async(req,res)=>{

try{

const note = new Note({

leadId:req.body.leadId,
noteText:req.body.noteText,
createdBy:req.user.id

})

await note.save()

res.json(note)

}catch(err){

res.status(500).json(err)

}

}

exports.getNotes = async(req,res)=>{

try{

const notes = await Note.find()
.populate("createdBy","name")
.populate("leadId","name company")


res.json(notes)

}catch(err){

res.status(500).json(err)

}

}




