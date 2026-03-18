import React,{useState} from "react"
import API from "../api"
import {useNavigate,Link} from "react-router-dom"

function Register(){

const navigate = useNavigate()

const [form,setForm] = useState({
name:"",
email:"",
password:"",
role:"sales"
})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e)=>{
e.preventDefault()

try{

await API.post("/auth/register",form)

alert("Registered Successfully")

navigate("/login")

}catch(err){
alert("Registration Failed",err)
}

}

return(

<div className="container mt-5">
<div className="row justify-content-center">

<div className="col-md-5">

<div className="card shadow">
<div className="card-body">

<h3 className="text-center mb-4">Register</h3>

<form onSubmit={handleSubmit}>

<input
className="form-control mb-3"
placeholder="Name"
name="name"
onChange={handleChange}
/>

<input
className="form-control mb-3"
placeholder="Email"
name="email"
onChange={handleChange}
/>

<input
type="password"
className="form-control mb-3"
placeholder="Password"
name="password"
onChange={handleChange}
/>

<select
className="form-control mb-3"
name="role"
onChange={handleChange}
>

<option value="sales">Sales</option>
<option value="admin">Admin</option>

</select>

<button className="btn btn-primary w-100">
Register
</button>

</form>

<div className="text-center mt-3">

<span>Already have an account? </span>

<Link to="/login">
Login
</Link>

</div>

</div>
</div>

</div>
</div>
</div>

)

}

export default Register