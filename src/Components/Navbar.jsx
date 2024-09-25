import {Link, Outlet} from 'react-router-dom'

function Navbar() {
    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Hi!</a>
                    <form className="d-flex" role="search">
                        <Link className="btn btn-outline-dark me-2" to ="/register" type="submit">SignUp</Link>
                        <Link className="btn btn-outline-dark" to="/login" type="submit">LogIn</Link>
                    </form>
                </div>
            </nav>
            <Outlet/>
        </>
    )
}

export default Navbar