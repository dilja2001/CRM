// import React,{useEffect,useState} from "react"
// import { useNavigate } from "react-router-dom"
// import API from "../api"

// function Notes(){

// const [notes,setNotes] = useState([])

// const navigate = useNavigate()

// /* FETCH NOTES */

// useEffect(()=>{

// const fetchNotes = async()=>{

// try{

// const res = await API.get("/notes",{
// headers:{
// Authorization:localStorage.getItem("token")
// }
// })

// setNotes(res.data)

// }catch(err){
// console.log(err)
// }

// }

// fetchNotes()

// },[])

// return(

// <div className="container mt-4">

// <div className="d-flex justify-content-between mb-4">

// <h2>Notes</h2>

// <button
// className="btn btn-outline-dark"
// onClick={()=>navigate("/admin")}
// >
//  Dashboard
// </button>

// </div>

// <div className="row">

// {notes.map(note=>(

// <div className="col-md-4 mb-3" key={note._id}>

// <div className="card shadow">

// <div className="card-body">

// <h6 className="text-muted">Lead ID</h6>
// <p>{note.leadId?.name} ({note.leadId?.company})</p>
// <h6 className="text-muted">Note</h6>
// <p>{note.noteText}</p>

// <h6 className="text-muted">Created By</h6>
// <p>{note.createdBy?.name}</p>

// </div>

// </div>

// </div>

// ))}

// </div>

// </div>

// )

// }

// export default Notes


import React,{useEffect,useState} from "react"
import { useNavigate } from "react-router-dom"
import API from "../api"

function Notes(){

const [notes,setNotes] = useState([])
const [loading,setLoading] = useState(false)
const navigate = useNavigate()

/* FETCH NOTES */

const fetchNotes = async()=>{
try{
setLoading(true)

const res = await API.get("/notes",{
headers:{
Authorization:localStorage.getItem("token")
}
})

setNotes(res.data)

}catch(err){
console.log(err)
}finally{
setLoading(false)
}
}

useEffect(()=>{
fetchNotes()
},[])




return(

<div className="container-fluid">

{/* HEADER */}
<div className="d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom bg-light">
<h4 className="mb-2 mb-md-0">Notes</h4>

<button
className="btn btn-outline-dark"
onClick={()=>navigate("/admin")}
>
 Dashboard
</button>
</div>

<div className="p-3">

{loading && <div className="alert alert-info">Loading...</div>}

<div className="row">

{notes.length === 0 ? (

<div className="text-center">No Notes Found</div>

) : (

notes.map(note=>(

<div className="col-12 col-sm-6 col-lg-4 mb-3" key={note._id}>

<div className="card shadow h-100">

<div className="card-body d-flex flex-column">

{/* LEAD */}
<h6 className="text-muted">Lead</h6>
<p className="fw-semibold">
{note.leadId 
? `${note.leadId.name} (${note.leadId.company})`
: "Deleted Lead"}
</p>

{/* NOTE */}
<h6 className="text-muted">Note</h6>
<p className="flex-grow-1">{note.noteText}</p>

{/* CREATED BY */}
<h6 className="text-muted">Created By</h6>
<p>{note.createdBy?.name}</p>

{/* DATE */}
<small className="text-muted">
{new Date(note.date).toLocaleDateString()}
</small>

{/* ACTIONS */}
<div className="mt-3 d-flex gap-2">





</div>

</div>

</div>

</div>

))

)}

</div>

</div>

</div>

)

}

export default Notes