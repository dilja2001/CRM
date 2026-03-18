// import React, { useEffect, useState } from "react"
// import API from "../api"
// import { useNavigate } from "react-router-dom"

// function AdminDashboard() {
// const navigate = useNavigate()
// const [data, setData] = useState(null)

// useEffect(() => {

// const fetchDashboard = async () => {

// try {

// const res = await API.get("/dashboard", {
// headers: {
// Authorization: localStorage.getItem("token")
// }
// })

// setData(res.data)

// } catch (err) {
// console.log(err)
// }

// }

// fetchDashboard()

// }, [])

// if (!data) {
// return (
// <div className="text-center mt-5">
// <h4>Loading Dashboard...</h4>
// </div>
// )
// }


// const logout = ()=>{

// localStorage.removeItem("token")

// navigate("/login")

// }

// return (

// <div className="container-fluid p-4">

// <h2 className="mb-4">Admin Dashboard</h2>

// <button
// className="btn btn-danger"
// onClick={logout}
// >
// Logout
// </button>

// {/* KPI CARDS */}

// <div className="col-md-3">
// <div
// className="card shadow text-center"
// style={{cursor:"pointer"}}
// onClick={()=>navigate("/leads")}
// >
// <div className="card-body">
// <h6>Total Leads</h6>
// <h3>{data.totalLeads}</h3>
// </div>
// </div>
// </div>

// <div className="col-md-3 ">
// <div
// className="card shadow text-center bg-primary"
// style={{cursor:"pointer"}}
// onClick={()=>navigate("/users")}
// >
// <div className="card-body">
// <h6> Users</h6>
// </div>
// </div>
// </div>



// <div className="col-md-3 ">
// <div
// className="card shadow text-center bg-primary"
// style={{cursor:"pointer"}}
// onClick={()=>navigate("/notes")}
// >
// <div className="card-body">
// <h6> Notes</h6>
// </div>
// </div>
// </div>





// {/* LEADS BY STATUS */}

// <h4 className="mt-5 mb-3">Leads by Status</h4>

// <div className="row g-3">

// <div className="col-md-2">
// <div className="card bg-primary text-white text-center shadow">
// <div className="card-body">
// <h6>New</h6>
// <h3>{data.leadsByStatus.New}</h3>
// </div>
// </div>
// </div>

// <div className="col-md-2">
// <div className="card bg-warning text-white text-center shadow">
// <div className="card-body">
// <h6>Contacted</h6>
// <h3>{data.leadsByStatus.Contacted}</h3>
// </div>
// </div>
// </div>

// <div className="col-md-2">
// <div className="card bg-info text-white text-center shadow">
// <div className="card-body">
// <h6>Proposal</h6>
// <h3>{data.leadsByStatus.Proposal}</h3>
// </div>
// </div>
// </div>

// <div className="col-md-2">
// <div className="card bg-success text-white text-center shadow">
// <div className="card-body">
// <h6>Won</h6>
// <h3>{data.leadsByStatus.Won}</h3>
// </div>
// </div>
// </div>

// <div className="col-md-2">
// <div className="card bg-danger text-white text-center shadow">
// <div className="card-body">
// <h6>Lost</h6>
// <h3>{data.leadsByStatus.Lost}</h3>
// </div>
// </div>
// </div>

// </div>

// {/* RECENT INTERACTIONS */}

// <h4 className="mt-5 mb-3">Recent Interactions</h4>

// <div className="card shadow">

// <div className="card-body">

// <table className="table table-striped">

// <thead>
// <tr>
// <th>Lead</th>
// <th>Note</th>
// <th>Created By</th>
// <th>Date</th>
// </tr>
// </thead>

// <tbody>

// {data.recentNotes.length === 0 ? (

// <tr>
// <td colSpan="4" className="text-center">
// No interactions yet
// </td>
// </tr>

// ) : (

// data.recentNotes.map((note, index) => (

// <tr key={index}>
// <td>{note.leadId?.name}</td>
// <td>{note.noteText}</td>
// <td>{note.createdBy?.name}</td>
// <td>{new Date(note.date).toLocaleDateString()}</td>
// </tr>

// ))

// )}

// </tbody>

// {/* <tbody>

// {data.recentNotes.length === 0 ? (

// <tr>
// <td colSpan="4" className="text-center">
// No interactions yet
// </td>
// </tr>

// ) : (

// data.recentNotes.map((note, index) => (

// <tr key={index}>

// <td>{note.leadId?.name || "No Lead"}</td>

// <td>{note.content || "No Note"}</td>

// <td>{note.createdBy?.name || "Unknown User"}</td>

// <td>
// {note.date 
// ? new Date(note.date).toLocaleDateString() 
// : "No Date"}
// </td>

// </tr>

// ))

// )}

// </tbody> */}




// </table>

// </div>

// </div>

// </div>

// )

// }

// export default AdminDashboard









import React, { useEffect, useState } from "react"
import API from "../api"
import { useNavigate } from "react-router-dom"

function AdminDashboard() {

const navigate = useNavigate()
const [data, setData] = useState(null)

useEffect(() => {

const fetchDashboard = async () => {

try {

const res = await API.get("/dashboard", {
headers: {
Authorization: localStorage.getItem("token")
}
})

setData(res.data)

} catch (err) {
console.log(err)
}

}

fetchDashboard()

}, [])

const logout = () => {
localStorage.removeItem("token")
navigate("/login")
}

if (!data) {
return (
<div className="d-flex justify-content-center align-items-center vh-100">
<h4>Loading Dashboard...</h4>
</div>
)
}

return (

<div className="container-fluid">

{/* HEADER */}
<div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
<h4 className="mb-0">Admin Dashboard</h4>

<button className="btn btn-danger" onClick={logout}>
Logout
</button>
</div>

<div className="p-3">

{/* KPI CARDS */}
<div className="row g-3 mb-4">

<div className="col-12 col-sm-6 col-md-4 col-lg-3">
<div
className="card shadow h-100 text-center"
style={{cursor:"pointer"}}
onClick={()=>navigate("/leads")}
>
<div className="card-body">
<h6>Total Leads</h6>
<h3>{data.totalLeads}</h3>
</div>
</div>
</div>

<div className="col-12 col-sm-6 col-md-4 col-lg-3">
<div
className="card shadow h-100 text-center bg-primary text-white"
style={{cursor:"pointer"}}
onClick={()=>navigate("/users")}
>
<div className="card-body">
<h6>All Users</h6>
</div>
</div>
</div>

<div className="col-12 col-sm-6 col-md-4 col-lg-3">
<div
className="card shadow h-100 text-center bg-dark text-white"
style={{cursor:"pointer"}}
onClick={()=>navigate("/notes")}
>
<div className="card-body">
<h6>All Notes</h6>
</div>
</div>
</div>

</div>

{/* LEADS BY STATUS */}
<h5 className="mb-3">Leads by Status</h5>

<div className="row g-3 mb-4">

{[
{label:"New", value:data.leadsByStatus.New, color:"primary"},
{label:"Contacted", value:data.leadsByStatus.Contacted, color:"warning"},
{label:"Proposal", value:data.leadsByStatus.Proposal, color:"info"},
{label:"Won", value:data.leadsByStatus.Won, color:"success"},
{label:"Lost", value:data.leadsByStatus.Lost, color:"danger"},
].map((item,index)=>(
<div key={index} className="col-6 col-md-4 col-lg-2">
<div className={`card text-white bg-${item.color} shadow text-center h-100`}>
<div className="card-body">
<h6>{item.label}</h6>
<h4>{item.value}</h4>
</div>
</div>
</div>
))}

</div>

{/* RECENT INTERACTIONS */}
<h5 className="mb-3">Recent Interactions</h5>

<div className="card shadow">

<div className="card-body table-responsive">

<table className="table table-hover">

<thead className="table-dark">
<tr>
<th>Lead</th>
<th>Note</th>
<th>Created By</th>
<th>Date</th>
</tr>
</thead>

<tbody>

{data.recentNotes.length === 0 ? (

<tr>
<td colSpan="4" className="text-center">
No interactions yet
</td>
</tr>

) : (

data.recentNotes.map((note, index) => (

<tr key={index}>
<td>{note.leadId?.name || "-"}</td>
<td>{note.noteText}</td>
<td>{note.createdBy?.name}</td>
<td>{new Date(note.date).toLocaleDateString()}</td>
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

export default AdminDashboard