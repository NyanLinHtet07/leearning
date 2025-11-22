import axios from "axios";

const api = axios.create({
    //baseURL: 'https://api.thecrystalacademy.org/api',
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
});

export default api;