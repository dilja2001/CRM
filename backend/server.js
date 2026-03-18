const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/authRoutes")
const leadRoutes = require("./routes/leadRoutes")
const noteRoutes = require("./routes/noteRoutes")
const userRoutes = require("./routes/userRoutes")
const dashboardRoutes = require("./routes/dashboardRoutes")

const app = express()

app.use(cors({
  origin: "https://clientcrm-taupe.vercel.app/api",

  credentials: true
}));
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/leads", leadRoutes)
app.use("/api/notes", noteRoutes)
app.use("/api/users",userRoutes)
app.use("/api/dashboard", dashboardRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((err)=>{
    console.log(err)
})

app.get("/",(req,res)=>{
    res.send("CRM API Running")
})



app.listen(5000,()=>{
    console.log('server running')
})