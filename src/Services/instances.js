import axios from 'axios'

//assign baseurl
const baseURL = 'https://todo-be-nlai.onrender.com/api'

//create instance
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
})

//create protected instance
const protectedInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        withCredentials: true
    }
})

//export
export { instance, protectedInstance }