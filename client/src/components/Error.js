import React from 'react'
import { NavLink} from 'react-router-dom';

const Error = () => {
    return (
    <div className="wrap">
        <h2>Error</h2>
        <p>Sorry! We just encountered an unexpected error.</p>
        <NavLink to="/">Go Home</NavLink>
    </div>
    )
}

export default Error
