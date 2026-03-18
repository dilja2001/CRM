import React, { useEffect, useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"

function SalesDashboard(){

const [leads,setLeads] = useState([])
const [loading,setLoading] = useState(false)
const navigate = useNavigate()

const [form,setForm] = useState({
name:"",
email:"",
phone:"",
company:""
})

const [errors,setErrors] = useState({})
const [noteText,setNoteText] = useState("")
const [selectedLead,setSelectedLead] = useState(null)

/* LOAD LEADS */

useEffect(()=>{

const loadLeads = async()=>{
try{
setLoading(true)

const res = await API.get("/leads",{
headers:{ Authorization:localStorage.getItem("token") }
})

setLeads(res.data)

}catch(err){
console.log(err)
}finally{
setLoading(false)
}
}

loadLeads()

},[])

/* REFRESH */

const fetchLeads = async()=>{
const res = await API.get("/leads",{
headers:{ Authorization:localStorage.getItem("token") }
})
setLeads(res.data)
}

/* INPUT */

const handleChange = (e)=>{

const {name,value} = e.target

// allow only numbers for phone
if(name==="phone"){
if(!/^\d*$/.test(value)) return
}

setForm({...form,[name]:value})

}

/* VALIDATION */

const validateForm = ()=>{

let newErrors = {}

if(!form.name || form.name.trim().length < 3){
newErrors.name = "Name must be at least 3 characters"
}

if(form.email && !/^\S+@\S+\.\S+$/.test(form.email)){
newErrors.email = "Invalid email format"
}

if(!/^\d{10}$/.test(form.phone)){
newErrors.phone = "Phone must be exactly 10 digits"
}

setErrors(newErrors)

return Object.keys(newErrors).length === 0

}

/* ADD LEAD */

const addLead = async(e)=>{

e.preventDefault()

if(!validateForm()) return


try{

await API.post("/leads",form,{
headers:{ Authorization:localStorage.getItem("token") }
})

setForm({name:"",email:"",phone:"",company:""})
setErrors({})
fetchLeads()

alert("Lead Added Successfully")

}catch(err){
console.log(err)
}

}

/* UPDATE STATUS */

const updateStatus = async(id,status)=>{
await API.put(`/leads/${id}`,{status},{
headers:{ Authorization:localStorage.getItem("token") }
})
fetchLeads()
}

/* ADD NOTE */

const addNote = async()=>{

if(!noteText.trim()) return

await API.post("/notes",{
leadId:selectedLead,
noteText
},{
headers:{ Authorization:localStorage.getItem("token") }
})

setNoteText("")
setSelectedLead(null)

alert("Note Added")

}

/* LOGOUT */

const logout = ()=>{
localStorage.removeItem("token")
navigate("/login")
}

return(

<div className="container-fluid">

{/* HEADER */}
<div className="d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom bg-light">
<h4 className="mb-2 mb-md-0">Sales Dashboard</h4>

<button className="btn btn-danger" onClick={logout}>
Logout
</button>
</div>

<div className="p-3">

{loading && <div className="alert alert-info">Loading...</div>}

{/* FORM */}
<div className="card shadow mb-4">
<div className="card-body">

<h5 className="mb-3">Add New Lead</h5>

<form onSubmit={addLead}>

<div className="row g-3">

<div className="col-12 col-md-6 col-lg-3">
<input
className={`form-control ${errors.name && "is-invalid"}`}
name="name"
value={form.name}
onChange={handleChange}
placeholder="Name"
/>
<div className="invalid-feedback">{errors.name}</div>
</div>

<div className="col-12 col-md-6 col-lg-3">
<input
className={`form-control ${errors.email && "is-invalid"}`}
name="email"
value={form.email}
onChange={handleChange}
placeholder="Email"
/>
<div className="invalid-feedback">{errors.email}</div>
</div>

<div className="col-12 col-md-6 col-lg-2">
<input
className={`form-control ${errors.phone && "is-invalid"}`}
name="phone"
value={form.phone}
onChange={handleChange}
placeholder="Phone"
maxLength="10"
/>
<div className="invalid-feedback">{errors.phone}</div>
</div>

<div className="col-12 col-md-6 col-lg-2">
<input
className={`form-control ${errors.phone && "is-invalid"}`}
name="company"
value={form.company}
onChange={handleChange}
placeholder="Company"
/>
</div>

<div className="col-12 col-lg-2">
<button className="btn btn-primary w-100">
Add Lead
</button>
</div>

</div>

</form>

</div>
</div>

{/* TABLE */}
<div className="card shadow">
<div className="card-body table-responsive">

<h5 className="mb-3">My Leads</h5>

<table className="table table-hover">

<thead className="table-dark">
<tr>
<th>Name</th>
<th>Company</th>
<th>Email</th>
<th>Phone No</th>
<th>Status</th>
<th>Update</th>
<th>Note</th>
</tr>
</thead>

<tbody>

{leads.length===0 ? (
<tr>
<td colSpan="5" className="text-center">No Leads Found</td>
</tr>
) : (

leads.map((lead)=>(

<tr key={lead._id}>

<td>{lead.name}</td>
<td>{lead.company}</td>
<td>{lead.email}</td>
<td>{lead.phone}</td>


<td>
<span className="badge bg-info text-dark">
{lead.status}
</span>
</td>

<td>
<select
className="form-select"
value={lead.status}
onChange={(e)=>updateStatus(lead._id,e.target.value)}
>
<option value="new">New</option>
<option value="contacted">Contacted</option>
<option value="proposal">Proposal</option>
<option value="won">Won</option>
<option value="lost">Lost</option>
</select>
</td>

<td>
<button
className="btn btn-success btn-sm"
onClick={()=>setSelectedLead(lead._id)}
>
Add Note
</button>
</td>

</tr>

))

)}

</tbody>

</table>

</div>
</div>

</div>

{/* MODAL */}
{selectedLead && (

<div className="modal d-block" style={{background:"rgba(0,0,0,0.5)"}}>
<div className="modal-dialog">
<div className="modal-content">

<div className="modal-header">
<h5>Add Note</h5>
<button className="btn-close" onClick={()=>setSelectedLead(null)}></button>
</div>

<div className="modal-body">
<textarea
className="form-control"
rows="4"
value={noteText}
onChange={(e)=>setNoteText(e.target.value)}
placeholder="Enter note..."
></textarea>
</div>

<div className="modal-footer">
<button className="btn btn-secondary" onClick={()=>setSelectedLead(null)}>
Cancel
</button>
<button className="btn btn-primary" onClick={addNote}>
Save
</button>
</div>

</div>
</div>
</div>

)}

</div>

)

}

export default SalesDashboard