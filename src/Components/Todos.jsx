import React, { useEffect, useState } from 'react';
import userServices from '../Services/userServices';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('all');

    // Fetch todos from the backend
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await userServices.GetTodos();
                setTodos(response.data.todos);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        };
        fetchTodos();
    }, []);

    // Handle marking todo as complete/incomplete
    const handleToggleStatus = async (todoId, currentStatus) => {
        try {
            const newStatus = !currentStatus;  // Toggle the status
            await userServices.UpdateTodo(todoId, newStatus);  // Call to update the todo status in the backend
            setTodos(todos.map(todo => 
                todo._id === todoId ? { ...todo, Status: newStatus } : todo
            ));  // Update the state with the new status
        } catch (error) {
            console.error("Error updating todo status:", error);
        }
    };

    // Handle deleting a todo
    const handleDelete = async (todoId) => {
        try {
            await userServices.DeleteTodo(todoId);  // Call to delete the todo from the backend
            setTodos(todos.filter(todo => todo._id !== todoId));  // Remove the todo from the state
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    // Filter todos based on the selected filter
    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.Status;
        if (filter === 'incomplete') return !todo.Status;
        return true; // Return all todos if 'all' is selected
    });

    return (
        <div className="container mt-5">
            <h2>Todos</h2>

            {/* Dropdown to filter todos */}
            <div className="mb-3" style={{ width: 200 }}>
                <select
                    id="filter"
                    className="form-select"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="completed">Completed</option>
                    <option value="incomplete">Incomplete</option>
                </select>
            </div>

            {/* Render filtered todos */}
            <div className="row">
                {filteredTodos.map((todo) => (  // Use filteredTodos instead of todos
                    <div key={todo._id} className="col-md-4 mb-4">
                        <div className={`card ${todo.Status ? 'border-dark' : 'border-light'}`}>
                            <div className="card-body">
                                <h4 className="card-title" style={{ color: "wheat" }}>{todo.title}</h4>
                                <h6 className="card-text" style={{ color: "wheat" }}>{todo.description}</h6>
                                <button
                                    className={`btn btn-sm ${todo.Status ? 'btn-secondary' : 'btn-success'} me-2`}
                                    onClick={() => handleToggleStatus(todo._id, todo.Status)}
                                >
                                    {todo.Status ? 'Completed' : 'Mark As Completed'}
                                </button>
                                <button
                                    className="btn btn-sm btn-danger"
                                    onClick={() => handleDelete(todo._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todos;