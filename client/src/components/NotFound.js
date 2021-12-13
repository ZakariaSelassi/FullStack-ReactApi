import React from 'react'
import { useNavigate,Navigate, Link } from 'react-router-dom';
const NotFound = () => {
    return (
        <div>
            <p>Click to route to "/oops" which isn't a registered route:</p>
            <Link to="/">Home</Link>
         </div>
    )
}

export default NotFound
