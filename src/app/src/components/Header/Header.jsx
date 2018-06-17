import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './Header.css';

export class Header extends React.Component {

    render() {
        return (
            <header className="app__header">
                <div className="header__events">Course Dashboard</div>
            </header>
        );
    }
}

Header.propTypes = {
}

export default Header;