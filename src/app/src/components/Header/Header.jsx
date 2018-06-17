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
            </header>
        );
    }
}

Header.propTypes = {
}

export default Header;