import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userServices from "../Services/userServices";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await userServices.Login(email, password);
        
        // Ensure response and data are not undefined
        if (response && response.data) {
            // Successfully logged in
            //console.log("Login successful:", response.data);
            navigate('/dashboard'); // Redirect to dashboard
        } else {
            throw new Error("Login failed: No data returned from server");
        }
    } catch (error) {
        console.error("Login error:", error.message || error);
        alert(error.response?.data?.message || "An error occurred during login.");
    }
};

  return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card">
                <div className="card-header" style={{ textAlign: "center" ,backgroundColor:"black", color:"white"}}>
                  Login
                </div>
                <div className="card-body">
                  <form onSubmit={handleLogin}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" 
                    value={email} onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" 
                    value={password} onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
              </form>
              <br />
              <p>Don't have an account? <Link to="/register">Register</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Login;