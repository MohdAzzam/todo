import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
export default withRouter(function Header({ location, history }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container">
                <Link className='navbar-brand' to={{ pathname: "/", }}>Home</Link>
            </div>
        </nav>

    );

});