// import React,{useEffect,useState} from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../api"

// function Users(){

// const [users,setUsers] = useState([])
// const navigate = useNavigate()

// useEffect(()=>{

// const fetchUsers = async()=>{

// try{

// const res = await API.get("/users",{
// headers:{
// Authorization:localStorage.getItem("token")
// }
// })

// setUsers(res.data)

// }catch(err){
// console.log(err)
// }

// }

// fetchUsers()

// },[])

// return(

// <div className="container mt-4">

// <div className="d-flex justify-content-between mb-3">

// <h2>Users</h2>

// <button
// className="btn btn-secondary"
// onClick={()=>navigate("/admin")}
// >
// Go To Dashboard
// </button>

// </div>

// <div className="card shadow">

// <div className="card-body">

// <table className="table table-striped">

// <thead>
// <tr>
//     <th>User_id</th>
// <th>Name</th>
// <th>Email</th>
// <th>Role</th>
// <th>Created At</th>
// </tr>
// </thead>

// <tbody>

// {users.map(user=>(
// <tr key={user._id}>
// <td>{user._id}</td>
// <td>{user.name}</td>
// <td>{user.email}</td>
// <td>{user.role}</td>
// <td>{new Date(user.createdAt).toLocaleDateString()}</td>

// </tr>
// ))}

// </tbody>

// </table>

// </div>

// </div>

// </div>

// )

// }

// export default Users





import React,{useEffect,useState} from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

function Users(){

const [users,setUsers] = useState([])
const navigate = useNavigate()

useEffect(()=>{

const fetchUsers = async()=>{
try{
const res = await API.get("/users",{
headers:{
Authorization:localStorage.getItem("token")
}
})
setUsers(res.data)
}catch(err){
console.log(err)
}
}

fetchUsers()

},[])

return(

<div className="container-fluid">

{/* HEADER */}
<div className="d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom bg-light">
<h4 className="mb-2 mb-md-0">Users Management</h4>

<button
className="btn btn-outline-dark"
onClick={()=>navigate("/admin")}
>
 Dashboard
</button>
</div>

<div className="p-3">

{/* CARD */}
<div className="card shadow">
<div className="card-body table-responsive">

<h5 className="mb-3">All Users</h5>

<table className="table table-hover align-middle">

<thead className="table-dark">
<tr>
<th>User ID</th>
<th>Name</th>
<th>Email</th>
<th>Role</th>
<th>Created</th>
</tr>
</thead>

<tbody>

{users.length === 0 ? (

<tr>
<td colSpan="5" className="text-center">
No users found
</td>
</tr>

) : (

users.map(user=>(

<tr key={user._id}>

<td style={{maxWidth:"120px",wordBreak:"break-all"}}>
{user._id}
</td>

<td>{user.name}</td>

<td>{user.email}</td>

<td>
<span className={`badge ${
user.role === "admin" ? "bg-danger" :
user.role === "sales" ? "bg-primary" :
"bg-secondary"
}`}>
{user.role}
</span>
</td>

<td>
{new Date(user.createdAt).toLocaleDateString()}
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

export default Users