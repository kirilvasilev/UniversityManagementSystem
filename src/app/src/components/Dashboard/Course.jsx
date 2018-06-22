import React from 'react';
import PropTypes from 'prop-types';
import { clickCatch, formatDate } from '../../utils/utils';
import './Course.css'

import Portal from '../Portal/Portal';

export class Course extends React.Component {

    constructor() {
        super();
        this.state = {
            showPortal: false
        };
    }

    deleteCourse(id) {
        this.props.deleteCourse(id);
    }

    deleteUserCourse(id) {
        this.props.deleteUserCourse(id);
    }

    render() {
        return (
            <div className="mdl-cell course-overview__course">
                <h4>{this.props.course.name}</h4>
                <p>{this.props.course.description}</p>
                <h5>Course lecturer: {this.props.course.lecturer}</h5>
                <h5>Course credits: {this.props.course.credits}</h5>
                <h4>Course Schedule:</h4>
                {this.props.course.schedules && <p>{this.props.course.schedules[0].dayOfWeek}, {this.props.course.schedules[0].time}, room: {this.props.course.schedules[0].room}</p>}
                <div className="course-overview__edit-delete">
                    {
                        this.props.isLecturer &&
                        <React.Fragment>
                            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={() =>
                                this.setState({ showPortal: true })}>
                                <i className="material-icons">edit</i>
                            </button>
                            <Portal
                                open={this.state.showPortal}
                                header="Update a course"
                                course={this.props.course}
                                isLecturer={true}
                                onClose={() => this.setState({ showPortal: false })} />
                        </React.Fragment>
                    }
                    {
                        this.props.isLecturer ?
                            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={() => {
                                this.deleteCourse(this.props.course.id)
                            }}>
                                <i className="material-icons">delete</i>
                            </button> :
                            <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={() => {
                                this.deleteUserCourse(this.props.course.id)
                            }}>
                                <i className="material-icons">delete</i>
                            </button>
                    }
                </div>
            </div>
        );
    }
}

Course.propTypes = {
    course: PropTypes.object.isRequired
}

export default Course;