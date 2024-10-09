import {Link, Outlet} from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav className="navbar bg-body-border">
                <div className="container-fluid">
                    <a className="navbar-brand" style={{color:"wheat"}}>Hi!</a>
                    <form className="d-flex" role="search">
                        <Link className="btn btn-outline-light me-2" to ="/register" type="submit">SignUp</Link>
                        <Link className="btn btn-outline-light" to="/login" type="submit">LogIn</Link>
                    </form>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar