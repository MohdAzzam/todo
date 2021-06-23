import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../context/Auth';

export default function UserNav({ history }) {
    const { user, handelLogout } = useContext(Auth.Context);
    function logout() {
        handelLogout();
        history.push("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className='navbar-brand' to={{ pathname: "/", }}>Home</Link>
                <label onClick={logout}>Logout</label>
            </div>
        </nav>
    )
}