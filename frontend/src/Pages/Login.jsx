import React,{useState} from "react"
import API from "../api"
import {useNavigate, Link} from "react-router-dom"

function Login(){

const navigate = useNavigate()

const [form,setForm] = useState({
email:"",
password:""
})

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value})
}

const handleSubmit = async(e)=>{
e.preventDefault()

try{

const res = await API.post("/auth/login",form)

localStorage.setItem("token",res.data.token)
localStorage.setItem("role",res.data.user.role)

const role = res.data.user.role

if(role==="admin"){
navigate("/admin")
}else{
navigate("/sales")
}

}catch(err){
alert("Login Failed",err)
}

}

return(

<div className="container mt-5">
<div className="row justify-content-center">

<div className="col-md-5">

<div className="card shadow">
<div className="card-body">

<h3 className="text-center mb-4">Login</h3>

<form onSubmit={handleSubmit}>

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

<button className="btn btn-success w-100">
Login
</button>

</form>

<div className="text-center mt-3">

<span>Don't have an account? </span>

<Link to="/register">
Register
</Link>

</div>

</div>
</div>

</div>
</div>
</div>

)

}

export default Login