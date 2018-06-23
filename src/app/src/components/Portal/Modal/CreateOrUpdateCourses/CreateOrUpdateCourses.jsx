import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


export class CreateOrUpdateCourses extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            dayOfWeek: "",
            time: "",
            room: "",
            credits: "",
            lecturer: "",
            id: "noId"
        };
    }

    componentWillMount() {
        this.props.fetchLecturers();
    }

    componentDidMount() {
        this.props && Object.keys(this.props.course).length &&
        
        this.setState({
            name: this.props.course.name,
            description: this.props.course.description,
            dayOfWeek: this.props.course.schedules && this.props.course.schedules[0].dayOfWeek,
            time: this.props.course.schedules && this.props.course.schedules[0].time,
            room: this.props.course.schedules && this.props.course.schedules[0].room,
            credits: this.props.course.credits,
            lecturer: this.props.course.lecturer && this.props.course.lecturer.id,
            id: this.props.course.id
        });
    }

    render() {
        return (
            <form className="app__login-form modal-content">
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input name" 
                        type="text" 
                        id="name" 
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        placeholder="Name"/>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input description" 
                        type="text" 
                        id="description" 
                        name="description"
                        value={this.state.description}
                        onChange={this.handleChange}
                        placeholder="Description"/>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input dayOfWeek" 
                        type="text" 
                        id="dayOfWeek" 
                        name="dayOfWeek"
                        value={this.state.dayOfWeek}
                        onChange={this.handleChange}
                        placeholder="Day of the week in number: 1-7"/>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input time" 
                        type="text" 
                        id="time" 
                        name="time"
                        value={this.state.time}
                        onChange={this.handleChange}
                        placeholder="Time: hh:mm:ss"/>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input room" 
                        type="text" 
                        id="room" 
                        name="room"
                        value={this.state.room}
                        onChange={this.handleChange}
                        placeholder="Room"/>
                    </div>
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input credits" 
                        type="text" 
                        id="credits" 
                        name="credits"
                        value={this.state.credits}
                        onChange={this.handleChange}
                        placeholder="Course credits"/>
                    </div>
                    <div className="mdl-selectfield mdl-js-selectfield">
                        <select className="mdl-selectfield__select" 
                        id="lecturer" 
                        name="lecturer"
                        value={this.state.lecturer != "" ? this.state.lecturer : ""}
                        onChange={this.handleSelectChange}>
                        <option value="" disabled hidden>Select a lecturer</option>
                            {
                                this.props.lecturers.map((lecturer, i) => <option key={i} value={lecturer.id}>{lecturer.firstName} {lecturer.lastName}</option>) 
                            }
                        </select>   
                        <span className="mdl-selectfield__error">Select a lecturer</span>
                    </div>
                    {
                        this.props.course.name
                            ? <button type="submit" className="mdl-button mdl-js-button submit-button" onClick={(event) => this.updateCourse(event)}>Modify</button>
                            : <button type="submit" className="mdl-button mdl-js-button submit-button" onClick={(event) => this.createCourse(event)}>Create</button>
                    }   
                </form>
        );
    }

    isValidCourse() {
        return this.state.name.length > 0 && this.state.description.length > 0
        && this.state.credits > 0 && this.state.lecturer && this.state.time.length > 0
        && this.state.dayOfWeek > 0 && this.state.room > 0;
    }

    handleChange = event => {
       
        this.setState({
        [event.target.id]: event.target.value
        });
    }
    handleSelectChange = event => {
        this.setState({
        [event.target.id]: event.target.options[event.target.selectedIndex].value
        });
    }

    createCourse = event => {
        event.preventDefault();
        if(this.isValidCourse()) {
            this.props.createCourse({
                name: this.state.name,
                description: this.state.description,
                schedules: [{
                    dayOfWeek: this.state.dayOfWeek,
                    time: this.state.time,
                    room: this.state.room
                }],
                credits: this.state.credits,
                lecturer: this.state.lecturer
            });
        } else {
            console.log("Invalid course creation, please fill in all the missing fields");
        }
    }

    updateCourse = event => {
        event.preventDefault();
        if(this.isValidCourse()) {
            this.props.updateCourse({
                id: this.state.id,
                name: this.state.name,
                description: this.state.description,
                schedules: [{
                    dayOfWeek: this.state.dayOfWeek,
                    time: this.state.time,
                    room: this.state.room
                }],
                credits: this.state.credits,
                lecturer: this.state.lecturer
            });
        }
    }
}

CreateOrUpdateCourses.propTypes = {
}

export default CreateOrUpdateCourses;