import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import userServices from "../Services/userServices"

function Register() {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const Navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    if(!userName || !email || !password) {
      alert("All fields are required");
      return;
    }
    if(password.length < 6){
      alert("Password must be at least 6 characters long.");  
      return;
    }

    //perform user registration
    userServices.Register(userName, email, password)
      .then((res) => {
        alert(res.data.message)

        //clear the form
        setUserName("")
        setEmail("")
        setPassword("")

        setTimeout(() => {
          Navigate("/login")
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
            <div className='card-header' style={{ textAlign: "center" ,backgroundColor:"black", color:"white"}}>
              Register
            </div>
            <div className="card-body">
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label" >Name</label>
                  <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="text" className="form-control" id="email" aria-describedby="emailHelp" value={email} onChange={(e) => setEmail(e.target.value)} />
                  <div id="emailHelp" className="form-text" style={{ color: "red" }}>We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="text" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <p>Already have an account?<Link to="/login">Login</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register