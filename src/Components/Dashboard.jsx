import React from 'react'
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import userServices from '../Services/userServices'

export async function loader() {
    //get the current user
    const res = await userServices.Me();
    return { user: res.data.user };
}
function Dashboard() {
    const { user } = useLoaderData();
    const navigate = useNavigate();

    const handleLogout = () => {
        userServices.Logout()
            .then((res) => {
                alert(res.data.message)

                setTimeout(() => {
                    navigate("/login")
                }, 500)
            }).catch((err) => {
                alert(err.response.data.message)
            })
    }

    return (
        <>
            <nav className="navbar bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand">Welcome</a>
                    <form className="d-flex" role="search">
                        <Link className="btn btn-outline-dark me-2" to="/todos" type="submit">Todo Lists</Link>
                        <button className="btn btn-outline-dark" type="submit" onClick={handleLogout}>Logout</button>
                    </form>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Dashboard