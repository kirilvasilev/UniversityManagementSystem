import React from 'react';
import PropTypes from 'prop-types';
import { clickCatch, formatDate } from '../../utils/utils';
import './Course.css'

export class Course extends React.Component {

    render() {

        return (
            <div className="mdl-cell course-overview__course" onClick={() => {
                    console.log("test")
                }}>
                <h3>Course number 1</h3>
            </div>
        );
    }
}

Course.propTypes = {
}

export default Course;