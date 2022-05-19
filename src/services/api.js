import axios from "axios";


const api = axios.create({
    baseURL: "https://api-contas-trade4devs.herokuapp.com"
})

export default api;