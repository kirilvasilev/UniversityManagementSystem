import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';

export class Footer extends React.Component {

    render() {
        return (
            <footer className="app__footer">
                Made by Kiril Vasilev and Zlatian Iliev
            </footer>
        );
    }
}

Footer.propTypes = {
    
}

export default Footer;