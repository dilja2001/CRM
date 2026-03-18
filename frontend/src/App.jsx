import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"

import Login from "./Pages/Login"
import Register from "./Pages/Register"

import AdminDashboard from "./dashboards/AdminDashboard"
import SalesDashboard from "./dashboards/SalesDashboard"

import ProtectedRoute from "./components/ProtectedRoute"
import Leads from "./Pages/Leads"
import Users from "./Pages/Users"
import Notes from "./Pages/Note"

function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Navigate to="/login"/>} />

<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>

<Route path="/admin" element={
<ProtectedRoute role="admin">
<AdminDashboard/>
</ProtectedRoute>
}/>

<Route path="/sales" element={
<ProtectedRoute role="sales">
<SalesDashboard/>
</ProtectedRoute>
}/>

<Route path="/leads" element={
<ProtectedRoute role="admin">
<Leads/>
</ProtectedRoute>
}/>
<Route path="/users" element={<Users/>}/>
<Route path="/notes" element={<Notes/>}/>

</Routes>

</BrowserRouter>

)

}

export default App