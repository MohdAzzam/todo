import React from 'react';
import { Link } from 'react-router-dom';

export default function GuestNav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className='navbar-brand' to={{ pathname: "/login", }}>Login</Link>
                <Link className='nav-link' to={{ pathname: "/register", }}>SignUp</Link>
            </div>
        </nav>
    )
}