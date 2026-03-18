const Lead = require("../models/Lead")
const Note = require("../models/Note") 
const User = require("../models/User")   // 🔥 ADD THIS


exports.createLead = async (req,res)=>{

 try{

  //  normalize email
  const email = req.body.email.toLowerCase().trim()

  //  CHECK 1: already exists in leads
  const existingLead = await Lead.findOne({ email })

  if(existingLead){
    return res.status(400).json({message:"Email already exists as a lead"})
  }

  // 🔥 CHECK 2: already exists in users
  const existingUser = await User.findOne({ email })

  if(existingUser){
    return res.status(400).json({message:"Email already exists as a user"})
  }

  let assignedUser

  if(req.user.role === "admin"){
    assignedUser = req.body.assignedTo
  }

  if(req.user.role === "sales"){
    assignedUser = req.user.id
  }

  const lead = new Lead({

    name:req.body.name,
    email:email,
    phone:req.body.phone,
    company:req.body.company,

    createdBy:req.user.id,
    assignedTo:assignedUser

  })

  await lead.save()

  res.json(lead)

 }catch(err){

  if(err.code === 11000){
    return res.status(400).json({message:"Email already exists"})
  }

  res.status(500).json(err)

 }

}








exports.getLeads = async (req,res)=>{

 try{

  let leads

  if(req.user.role === "admin"){

    leads = await Lead.find()
    .populate("assignedTo","name")
    .populate("createdBy","name")

  }else{

    leads = await Lead.find({
      assignedTo:req.user.id
    })
    .populate("assignedTo","name")
    .populate("createdBy","name")

  }

  res.json(leads)

 }catch(err){

  res.status(500).json(err)

 }

}



exports.updateLead = async(req,res)=>{

try{

let updateData = req.body


if(req.body.status){
req.body.status = req.body.status.toLowerCase()
}

if(req.user.role === "sales"){

updateData = {
status:req.body.status
}

}

const lead = await Lead.findByIdAndUpdate(
req.params.id,
updateData,
// {new:true}
 { returnDocument: "after" }
)

res.json(lead)

}catch(err){

res.status(500).json(err)

}

}

exports.assignLead = async(req,res)=>{

try{

const {salesUserId} = req.body

const lead = await Lead.findByIdAndUpdate(

req.params.id,

{assignedTo:salesUserId},

{new:true}

)

res.json(lead)

}catch(err){

res.status(500).json(err)

}

}



exports.deleteLead = async (req, res) => {

try{

// 1️⃣ Delete the lead
const lead = await Lead.findByIdAndDelete(req.params.id)

if(!lead){
return res.status(404).json({message:"Lead not found"})
}

// 2️⃣ Delete all notes related to this lead
await Note.deleteMany({ leadId: req.params.id })

res.json({message:"Lead and related notes deleted successfully"})

}catch(err){
res.status(500).json(err)
}

}

