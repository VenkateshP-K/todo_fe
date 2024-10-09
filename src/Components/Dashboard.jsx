import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import userServices from '../Services/userServices';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    // Fetch user data on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await userServices.Me();
                setUser(response.data.user);  // Set user data
            } catch (error) {
                if (error.response?.status === 401) {
                    navigate('/login');  // Redirect to login if unauthorized
                } else {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();  // Call the function to fetch user data
    }, [navigate]);

    // If we submit, it creates a todo
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent page reload
        try {
            // Pass title and description to the CreateTodo function
            const response = await userServices.CreateTodo({ title, description });
            alert(response.data.message);
            setTitle('');  // Clear the form
            setDescription('');
        } catch (error) {
            alert(error.response?.data?.message || "Error creating todo");
        }
    };

    const handleLogout = async () => {
        try {
            // Call logout API
            const res = await userServices.Logout();

            // Clear the local storage token as it's not needed anymore
            localStorage.removeItem('token');

            // Display success message
            alert(res.data.message);

            // Redirect to login page
            navigate('/login');
        } catch (err) {
            // Handle any errors during logout
            alert(err.response?.data?.message || "Error during logout");
        }
    };

    if (!user) {
        return <div><h3 className="text-center mt-5">Not An Authorized User</h3></div>
    }

    return (
        <>
            <nav className="navbar bg-body-border" >
                <div className="container-fluid">
                    <p className="navbar-brand" style={{ color: "wheat" }}><b>Hi {user.userName}!</b></p>
                    <form className="d-flex" role="search">
                        <Link to="/dashboard/todos" className="btn btn-outline-light me-2">Todos</Link>
                        <button className="btn btn-outline-light" type="button" onClick={handleLogout}>Logout</button>
                    </form>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <div className="card">
                            <div className='card-header'style={{ textAlign: "center" ,backgroundColor:"black", color:"white"}}>ToDo Tasks</div>
                            <div className="card-body">
                                {/* Change form to use onSubmit */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Title</label>
                                        <input type="text" className="form-control" id="title" value={title}
                                            onChange={(e) => setTitle(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Description</label>
                                        <textarea type="text" className="form-control" style={{ height: "100px" }} id="description" value={description}
                                            onChange={(e) => setDescription(e.target.value)} />
                                    </div>
                                    {/* Ensure the button is of type submit */}
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;