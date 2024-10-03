import axios from "axios"

const APIBase = () =>{
    const BASE_URL = 'https://mocki.io/'
    const axios = axios.create({baseURL : BASE_URL})

    return axios
}

export default APIBase