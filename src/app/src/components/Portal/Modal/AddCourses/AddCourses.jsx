import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


export class AddCourses extends React.Component {

    render() {
        return (
            <button className="mdl-button mdl-js-button mdl-button--fab course-overview__enroll" onClick={() =>
                this.addCourse(this.props.courseId)}>
                <i className="material-icons">library_add</i>
            </button>
        );
    }

    addCourse = courseId => {
        this.props.addUserCourse(courseId);
    }
}

AddCourses.propTypes = {
}

export default AddCourses;