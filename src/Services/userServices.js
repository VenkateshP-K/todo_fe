import { instance, protectedInstance } from "./instances";

//define user services
const userServices = {
    // Register user
    Register: async (userName, email, password) => {
        return await instance.post('/users/register', { userName, email, password });
    },

    // Get current user (Me)
    Me: async () => {
        const token = localStorage.getItem('token');  // Fetch the token from localStorage
        if (!token) {
            throw new Error("No token found in localStorage");
        }

        // Include the token in the Authorization header
        return await protectedInstance.get("/users/me", {
            headers: {
                Authorization: `Bearer ${token}`  // Ensure 'Bearer' prefix
            }
        });
    },
    // Login user
    Login: async (email, password) => {
        const response = await instance.post("/users/login", { email, password });
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response;
    },

    // Logout user
    Logout: async () => {
        const token = localStorage.getItem('token');  // Get token from localStorage
        return await protectedInstance.post('/users/logout', {}, {
            headers: {
                'Authorization': `Bearer ${token}`  // Attach the token manually
            },
        });
    },
    //createTodo
    CreateTodo: async (todoData) => {
        const token = localStorage.getItem('token');  // Fetch token from localStorage
        console.log("Token:", token);  // Add this to check if token exists
        if (!token) {
            throw new Error("No token found in localStorage");
        }
    
        // Make the request with the todo data and token
        return await protectedInstance.post('/users/createTodo', todoData, {
            headers: {
                'Authorization': `Bearer ${token}`  // Attach the token in headers
            }
        });
    },

    //get todos
    GetTodos: async () => {
        const token = localStorage.getItem('token');  // Fetch the token from localStorage
        if (!token) {
            throw new Error("No token found in localStorage");
        }

        // Make sure the token is included in the Authorization header
        return await protectedInstance.get('/users/getTodos', {
            headers: {
                Authorization: `Bearer ${token}`  // Attach token
            }
        })
    },

    //update todo
    UpdateTodo: async (todoId, newStatus) => {
        const token = localStorage.getItem('token');  // Ensure the token is fetched
        return await protectedInstance.put(
            `/users/updateTodo/${todoId}`,
            { Status: newStatus },  // Pass newStatus in the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`,  // Attach the token in headers
                }
            }
        );
    },

    //delete todo
    DeleteTodo: async (todoId) => {
        const token = localStorage.getItem('token');
        return await protectedInstance.delete(`/users/deleteTodo/${todoId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

    }

}


//export 
export default userServices;