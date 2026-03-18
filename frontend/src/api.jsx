import axios from "axios"

const API = axios.create({
    baseURL: "https://crm-server-6cnb.onrender.com/api"
})

export default API