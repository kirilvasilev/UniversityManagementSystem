import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Header.css';

export class Header extends React.Component {

    render() {
        let header = "My Courses";

        if (window.location.pathname === "/login") {
            header = "Login"
        } else if (window.location.pathname === "/signup") {
            header = "Sign up"
        }

        return (
            <header className="app__header">
                <div className="header">{header}</div>
                <Link className="header__link" to="/">Courses</Link>
                <br/>
                <Link className="header__link" to="/login">Login</Link>
                <br/>
                <Link className="header__link" to="/signup">Signup</Link>
            </header>
        );
    }
}

Header.propTypes = {
}

export default Header;