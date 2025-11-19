import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.thecrystalacademy.org/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json'
    }
});

export default api;