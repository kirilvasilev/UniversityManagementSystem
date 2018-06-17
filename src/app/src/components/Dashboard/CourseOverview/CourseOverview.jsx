import React from 'react';
import PropTypes from 'prop-types';
import Course from '../Course';
import './CourseOverview.css';

export class CourseOverview extends React.Component {
    
    componentWillMount() {
        // loading all of the courses
        // this.props.fetchCourses();
    }

    render() {
        return (
            <div className="content-grid mdl-grid app__course-overview">
                <div className="mdl-cell course-overview__course add">
                    <h3 className="course-overview__enroll-title">Enroll in a new course</h3>
                    <button className="mdl-button mdl-js-button mdl-button--fab course-overview__enroll"><i className="material-icons">add</i></button>
                </div>
                {this.props.courses.courses.map(course => <Course key={course.id} course={course}/>)}
            </div>
        );
    }
}

CourseOverview.propTypes = {
}

export default CourseOverview;