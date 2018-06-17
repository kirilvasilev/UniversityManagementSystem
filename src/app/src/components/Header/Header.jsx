import React from 'react';
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

Event.propTypes = {
}

export default Header;