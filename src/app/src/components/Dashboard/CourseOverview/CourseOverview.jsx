import React from 'react';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import CourseContainer from '../../../containers/CourseContainer';
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
        (this.props.auth && this.props.auth.isLecturer)
            ? this.props.fetchCourses()
            : this.props.fetchUserSpecificCourses() && this.props.fetchCourses();
    }

    render() {
        if(!this.props.auth.jwt) return <Link to="/login"><h1>Not authorized! Please Login first.</h1></Link>;
        return (
            <div className="content-grid mdl-grid app__course-overview">
                {
                    (this.props.auth && this.props.auth.isLecturer) ?
                        <div className="mdl-cell course-overview__course add">
                            <h3 className="course-overview__enroll-title">Create a course</h3>
                            <button className="mdl-button mdl-js-button mdl-button--fab course-overview__enroll" onClick={() =>
                                this.setState({ showPortal: true })}><i className="material-icons">add</i></button>
                            <Portal
                                open={this.state.showPortal}
                                header="Create a course"
                                course={this.props.courses}
                                isLecturer={true}
                                onClose={() => this.setState({showPortal: false})}/>
                            
                        </div> :
                        <div className="mdl-cell course-overview__course add">
                            <h3 className="course-overview__enroll-title">Enroll in a new course</h3>
                            <button className="mdl-button mdl-js-button mdl-button--fab course-overview__enroll" onClick={() =>
                                this.setState({ showPortal: true })}><i className="material-icons">add</i></button>
                            <Portal
                                open={this.state.showPortal}
                                header="Entroll in a new course"
                                course={this.props.courses}
                                isLecturer={false}
                                onClose={() => this.setState({showPortal: false})}/>
                            
                        </div>
                }
                {
                    !this.props.auth.isLecturer 
                        ? this.props.userCourses && this.props.userCourses.length > 0 && this.props.userCourses.map(course => <CourseContainer key={(Math.random() * 10000)} course={course}/>)
                        : this.props.courses && this.props.courses.length > 0 && this.props.courses.map(course => <CourseContainer key={(Math.random() * 10000)} course={course}/>)
                }
            </div>
        );
    }
}

CourseOverview.propTypes = {
    auth: PropTypes.object,
    courses: PropTypes.any
}

export default CourseOverview;