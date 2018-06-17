import React from 'react';
import PropTypes from 'prop-types';
import { clickCatch, formatDate } from '../../utils/utils';
import './Course.css'

export class Course extends React.Component {

    render() {
        return (
            <div className="mdl-cell course-overview__course">
                <h4>{this.props.course.name}</h4>
                <p>{this.props.course.description}</p>
                <h5>Course lecturer: {this.props.course.lecturer}</h5>
                <h5>Course credits: {this.props.course.credits}</h5>
                <h4>Course Schedule:</h4>
                {this.props.course.schedules && this.props.course.schedules.map(schedule => <p key={schedule.time + schedule.dayOfWeek}>{schedule.dayOfWeek}, {schedule.time}, room: {schedule.room}</p>)}
                <div className="course-overview__edit-delete">
                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={() => {
                        console.log("edit")
                    }}>
                    <i className="material-icons">edit</i>
                    </button>
                    <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={() => {
                        console.log("delete")
                    }}>
                    <i className="material-icons">delete</i>
                    </button>
                </div>
            </div>
        );
    }
}

Course.propTypes = {
    course: PropTypes.object.isRequired
}

export default Course;