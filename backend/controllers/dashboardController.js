const Lead = require("../models/Lead")
const Note = require("../models/Note")

exports.getDashboard = async(req,res)=>{

try{

// total leads
const totalLeads = await Lead.countDocuments()

// leads by status
const newLeads = await Lead.countDocuments({status:"new"})
const contactedLeads = await Lead.countDocuments({status:"contacted"})
const proposalLeads = await Lead.countDocuments({status:"proposal"})
const wonLeads = await Lead.countDocuments({status:"won"})
const lostLeads = await Lead.countDocuments({status:"lost"})

// leads assigned to current user
const myLeads = await Lead.countDocuments({
assignedTo:req.user.id
})

// recent interactions
const recentNotes = await Note.find()
.populate("leadId","name")
.populate("createdBy","name")
.sort({date:-1})
.limit(5)

res.json({

totalLeads,

leadsByStatus:{
New:newLeads,
Contacted:contactedLeads,
Proposal:proposalLeads,
Won:wonLeads,
Lost:lostLeads
},

myLeads,
recentNotes

})

}catch(err){

res.status(500).json({message:err.message})

}

}