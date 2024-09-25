import Login from "../Components/Login";
import { instance, protectedInstance } from "./instances";

//define user services
const userServices = {
    //register user
    Register: async (userName, email, password) => {
        return await instance.post('/users/register',
            { userName, email, password })
    },

    //get current user
    Me : async () => {
        return await protectedInstance.get('/users/me')
    },

    //login user
    Login : async (email, password) => {
        return await protectedInstance.post('/users/login',
            { email, password })
    },

    Logout : async () => {
        return await protectedInstance.post('/users/logout')
    }
}

//export 
export default userServices;