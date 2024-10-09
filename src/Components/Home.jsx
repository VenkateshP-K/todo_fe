import React from 'react'

function Home() {
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-body">
                            <p>Welcome</p>
                            <div className="card">
                                <img src="https://cdn.pixabay.com/photo/2016/03/31/19/50/checklist-1295319_1280.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title" style={{color:"wheat"}}>ToDo App</h5>
                                    <p className="card-text">ToDo List App can help you organize your tasks and stay productive. It is used to maintain our day-to-day tasks or list everything that we have to do.(A simple ToDo App using React and Bootstrap.)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home