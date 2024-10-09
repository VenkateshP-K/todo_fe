import axios from 'axios';

const baseURL = 'https://todo-be-nlai.onrender.com/api';

// create an axios instance
const instance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const protectedInstance = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export { instance, protectedInstance };