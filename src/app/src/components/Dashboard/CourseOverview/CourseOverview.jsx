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
                {/* {this.props.courses.courses.map(course => <CourseContainer key={course.id} course={course}/>)} */}
                <Course/>
            </div>
        );
    }
}

CourseOverview.propTypes = {
}

export default CourseOverview;