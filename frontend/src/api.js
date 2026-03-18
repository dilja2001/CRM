import axios from "axios"

const API = axios.create({
    baseURL: "https://crm-23pk.onrender.com/api"
})

export default API