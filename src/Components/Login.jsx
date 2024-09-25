import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userServices from '../Services/userServices'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const Navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert("All fields are required");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        //perform user login
        userServices.Login(email, password)
            .then((res) => {
                alert(res.data.message)

                //clear the form
                setEmail("")
                setPassword("")

                setTimeout(() => {
                    Navigate("/dashboard")
                }, 500)
            }).catch((err) => {
                alert(err.response.data.message)
            })
    }
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className='card-header'>
                            Login
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                                <p>Don't have an account?<Link to="/register">Register</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login