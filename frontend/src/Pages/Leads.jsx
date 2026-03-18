




// import React, { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../api"

// function Leads(){

// const navigate = useNavigate()

// const [leads,setLeads] = useState([])

// const [form,setForm] = useState({
// name:"",
// email:"",
// phone:"",
// company:"",
// assignedTo:""
// })

// const [errors,setErrors] = useState({})

// const [editingId,setEditingId] = useState(null)

// /* LOAD LEADS */

// useEffect(()=>{

// const loadLeads = async()=>{

// try{

// const res = await API.get("/leads",{
// headers:{
// Authorization:localStorage.getItem("token")
// }
// })

// setLeads(res.data)

// }catch(err){
// console.log(err)
// }

// }

// loadLeads()

// },[])

// /* REFRESH LEADS */

// const refreshLeads = async()=>{

// try{

// const res = await API.get("/leads",{
// headers:{
// Authorization:localStorage.getItem("token")
// }
// })

// setLeads(res.data)

// }catch(err){
// console.log(err)
// }

// }

// /* INPUT CHANGE */

// const handleChange = (e)=>{

// const {name,value} = e.target

// if(name === "phone"){
// if(!/^[0-9]*$/.test(value)) return
// }

// setForm({...form,[name]:value})

// }

// /* FORM VALIDATION */

// const validateForm = ()=>{

// let newErrors = {}

// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// if(!form.name.trim()){
// newErrors.name = "Name is required"
// }

// if(!emailRegex.test(form.email)){
// newErrors.email = "Enter valid email (example@gmail.com)"
// }

// if(!/^[0-9]{10}$/.test(form.phone)){
// newErrors.phone = "Phone must be 10 digits"
// }

// if(!form.company.trim()){
// newErrors.company = "Company is required"
// }

// setErrors(newErrors)

// return Object.keys(newErrors).length === 0

// }

// /* EDIT LEAD */

// const editLead = (lead)=>{

// setForm({
// name:lead.name,
// email:lead.email,
// phone:lead.phone,
// company:lead.company,
// status:lead.status,
// assignedTo:lead.assignedTo?._id || ""
// })

// setEditingId(lead._id)

// }

// /* CANCEL EDIT */

// const cancelEdit = ()=>{

// setEditingId(null)

// setForm({
// name:"",
// email:"",
// phone:"",
// company:"",
// assignedTo:""
// })

// setErrors({})

// }

// /* CREATE OR UPDATE */

// const handleSubmit = async(e)=>{

// e.preventDefault()

// if(!validateForm()) return

// try{

// if(editingId){

// await API.put(`/leads/${editingId}`,form,{
// headers:{
// Authorization:localStorage.getItem("token")
// }
// })

// }else{

// await API.post("/leads",form,{
// headers:{
// Authorization:localStorage.getItem("token")
// }
// })

// }

// cancelEdit()

// refreshLeads()

// }catch(err){
// console.log(err)
// }

// }

// /* DELETE LEAD */

// const deleteLead = async(id)=>{

// if(!window.confirm("Delete this lead?")) return

// await API.delete(`/leads/${id}`,{
// headers:{
// Authorization:localStorage.getItem("token")
// }
// })

// refreshLeads()

// }

// return(

// <div className="container mt-4">

// <div className="d-flex justify-content-between mb-3">

// <h2>Leads</h2>

// <button
// className="btn btn-secondary"
// onClick={()=>navigate("/admin")}
// >
// Go To Dashboard
// </button>

// </div>

// {/* ADD / EDIT FORM */}

// <div className="card mb-4 shadow">

// <div className="card-body">

// <h5>{editingId ? "Edit Lead" : "Add Lead"}</h5>

// <form onSubmit={handleSubmit}>

// <div className="row g-2">

// <div className="col-md-2">
// <input
// className="form-control"
// type="text"
// name="name"
// value={form.name}
// onChange={handleChange}
// placeholder="Name"
// />
// {errors.name && <small className="text-danger">{errors.name}</small>}
// </div>

// <div className="col-md-2">
// <input
// className="form-control"
// type="email"
// name="email"
// value={form.email}
// onChange={handleChange}
// placeholder="Email"
// />
// {errors.email && <small className="text-danger">{errors.email}</small>}
// </div>

// <div className="col-md-2">
// <input
// className="form-control"
// type="text"
// name="phone"
// value={form.phone}
// onChange={handleChange}
// placeholder="Phone"
// />
// {errors.phone && <small className="text-danger">{errors.phone}</small>}
// </div>

// <div className="col-md-2">
// <input
// className="form-control"
// type="text"
// name="company"
// value={form.company}
// onChange={handleChange}
// placeholder="Company"
// />
// {errors.company && <small className="text-danger">{errors.company}</small>}
// </div>


// <div className="col-md-2">
// <input
// className="form-control"
// type="text"
// name="assignedTo"
// value={form.assignedTo}
// onChange={handleChange}
// placeholder="Assigned User ID"
// />
// </div>

// <div className="col-md-2 d-flex">

// <button className="btn btn-primary me-2">

// {editingId ? "Update" : "Add"}

// </button>

// {editingId && (

// <button
// type="button"
// className="btn btn-secondary"
// onClick={cancelEdit}
// >
// Cancel
// </button>

// )}

// </div>

// </div>

// </form>

// </div>

// </div>

// {/* LEADS TABLE */}

// <div className="card shadow">

// <div className="card-body">

// <table className="table table-striped">

// <thead>
// <tr>
// <th>Name</th>
// <th>Email</th>
// <th>Phone</th>
// <th>Company</th>
// <th>Assigned To</th>
// <th>Created By</th>
// <th>status</th>
// <th>Actions</th>
// </tr>
// </thead>

// <tbody>

// {leads.map((lead)=>(

// <tr key={lead._id}>

// <td>{lead.name}</td>
// <td>{lead.email}</td>
// <td>{lead.phone}</td>
// <td>{lead.company}</td>
// <td>{lead.assignedTo?.name}</td>
// <td>{lead.createdBy?.name}</td>
// <td>{lead.status}</td>


// <td>


// <button
// className="btn btn-warning btn-sm me-2"
// onClick={()=>editLead(lead)}
// >
// Edit
// </button>

// <button
// className="btn btn-danger btn-sm"
// onClick={()=>deleteLead(lead._id)}
// >
// Delete
// </button>

// </td>

// </tr>

// ))}

// </tbody>

// </table>

// </div>

// </div>

// </div>

// )

// }

// export default Leads




import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

function Leads(){

const navigate = useNavigate()

const [leads,setLeads] = useState([])
const [form,setForm] = useState({
name:"",
email:"",
phone:"",
company:"",
assignedTo:""
})

const [errors,setErrors] = useState({})
const [editingId,setEditingId] = useState(null)

/* LOAD LEADS */

useEffect(()=>{

const loadLeads = async()=>{
try{
const res = await API.get("/leads",{
headers:{ Authorization:localStorage.getItem("token") }
})
setLeads(res.data)
}catch(err){
console.log(err)
}
}

loadLeads()

},[])

/* REFRESH */

const refreshLeads = async()=>{
const res = await API.get("/leads",{
headers:{ Authorization:localStorage.getItem("token") }
})
setLeads(res.data)
}

/* INPUT */

const handleChange = (e)=>{
const {name,value} = e.target

if(name==="phone" && !/^[0-9]*$/.test(value)) return

setForm({...form,[name]:value})
}

/* VALIDATION */

const validateForm = ()=>{
let newErrors = {}

if(!form.name.trim()) newErrors.name="Name required"

if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)){
newErrors.email="Valid email required"
}

if(!/^[0-9]{10}$/.test(form.phone)){
newErrors.phone="Phone must be 10 digits"
}

if(!form.company.trim()) newErrors.company="Company required"

setErrors(newErrors)
return Object.keys(newErrors).length===0
}

/* EDIT */

const editLead = (lead)=>{
setForm({
name:lead.name,
email:lead.email,
phone:lead.phone,
company:lead.company,
assignedTo:lead.assignedTo?._id || ""
})
setEditingId(lead._id)
}

/* CANCEL */

const cancelEdit = ()=>{
setEditingId(null)
setForm({name:"",email:"",phone:"",company:"",assignedTo:""})
setErrors({})
}

/* SUBMIT */

const handleSubmit = async(e)=>{
e.preventDefault()
if(!validateForm()) return

if(editingId){
await API.put(`/leads/${editingId}`,form,{
headers:{ Authorization:localStorage.getItem("token") }
})
}else{
await API.post("/leads",form,{
headers:{ Authorization:localStorage.getItem("token") }
})
}

cancelEdit()
refreshLeads()
}

/* DELETE */

const deleteLead = async(id)=>{
if(!window.confirm("Delete this lead?")) return

await API.delete(`/leads/${id}`,{
headers:{ Authorization:localStorage.getItem("token") }
})

refreshLeads()
}

return(

<div className="container-fluid">

{/* HEADER */}
<div className="d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom bg-light">
<h4 className="mb-2 mb-md-0">Leads Management</h4>

<button
className="btn btn-outline-dark"
onClick={()=>navigate("/admin")}
>
 Dashboard
</button>
</div>

<div className="p-3">

{/* FORM */}
<div className="card shadow mb-4">
<div className="card-body">

<h5 className="mb-3">{editingId ? "Edit Lead" : "Add New Lead"}</h5>

<form onSubmit={handleSubmit}>

<div className="row g-3">

<div className="col-12 col-md-6 col-lg-2">
<input
className={`form-control ${errors.name && "is-invalid"}`}
name="name"
value={form.name}
onChange={handleChange}
placeholder="Name"
/>
<div className="invalid-feedback">{errors.name}</div>
</div>

<div className="col-12 col-md-6 col-lg-2">
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
className={`form-control ${errors.company && "is-invalid"}`}
name="company"
value={form.company}
onChange={handleChange}
placeholder="Company"
/>
<div className="invalid-feedback">{errors.company}</div>
</div>

<div className="col-12 col-md-6 col-lg-2">
<input
className="form-control"
name="assignedTo"
value={form.assignedTo}
onChange={handleChange}
placeholder="Assigned to UserId"
/>
</div>

<div className="col-12 col-md-6 col-lg-2 d-flex gap-2">
<button className="btn btn-primary w-100">
{editingId ? "Update" : "Add"}
</button>

{editingId && (
<button
type="button"
className="btn btn-secondary w-100"
onClick={cancelEdit}
>
Cancel
</button>
)}

</div>

</div>

</form>

</div>
</div>

{/* TABLE */}
<div className="card shadow">
<div className="card-body table-responsive">

<h5 className="mb-3">All Leads</h5>

<table className="table table-hover">

<thead className="table-dark">
<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Company</th>
<th>Assigned</th>
<th>Created</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{leads.length===0 ? (
<tr>
<td colSpan="8" className="text-center">No leads found</td>
</tr>
) : (

leads.map((lead)=>(
<tr key={lead._id}>

<td>{lead.name}</td>
<td>{lead.email}</td>
<td>{lead.phone}</td>
<td>{lead.company}</td>
<td>{lead.assignedTo?.name || "-"}</td>
<td>{lead.createdBy?.name || "-"}</td>

<td>
<span className="badge bg-info text-dark">
{lead.status}
</span>
</td>

<td className="d-flex flex-wrap gap-2">

<button
className="btn btn-warning btn-sm"
onClick={()=>editLead(lead)}
>
Edit
</button>

<button
className="btn btn-danger btn-sm"
onClick={()=>deleteLead(lead._id)}
>
Delete
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

</div>

)

}

export default Leads