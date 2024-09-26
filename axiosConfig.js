import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://localhost:7071/api'
})

export default instance;