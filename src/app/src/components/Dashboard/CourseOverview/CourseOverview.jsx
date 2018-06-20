import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import Course from '../Course';
import './CourseOverview.css';

import Portal from '../../Portal/Portal';

export class CourseOverview extends React.Component {

    constructor() {
        super();
        this.state = {
          showPortal: false
        };
    }
    
    componentWillMount() {
        // loading all of the courses
        this.props.fetchCourses();
    }

    render() {
        if(!this.props.auth.jwt) return <Link to="/login"><h1>Not authorized! Please Login first.</h1></Link>;
        return (
            <div className="content-grid mdl-grid app__course-overview" >
                <div className="mdl-cell course-overview__course add">
                    <h3 className="course-overview__enroll-title">Create a course</h3>
                    <button className="mdl-button mdl-js-button mdl-button--fab course-overview__enroll" onClick={() =>
                        this.setState({ showPortal: true })}><i className="material-icons">add</i></button>
                    <Portal
                        open={this.state.showPortal}
                        header="Create a course"
                        course={this.props.courses}
                        onClose={() => this.setState({showPortal: false})}/>
                    
                </div>
                {this.props.courses && this.props.courses.length > 0 && this.props.courses.map(course => <Course key={course.id} course={course}/>)}
            </div>
        );
    }
}

CourseOverview.propTypes = {
    auth: PropTypes.object,
    courses: PropTypes.any
}

export default CourseOverview;