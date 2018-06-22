import React, { Component } from "react";
import "./Modal.css";

export class Modal extends Component {

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

    componentDidMount() {
        this.props && Object.keys(this.props.course).length &&
        this.setState({
            name: this.props.course.name,
            description: this.props.course.description,
            dayOfWeek: this.props.course.schedules && this.props.course.schedules[0].dayOfWeek,
            time: this.props.course.schedules && this.props.course.schedules[0].time,
            room: this.props.course.schedules && this.props.course.schedules[0].room,
            credits: this.props.course.credits,
            lecturer: this.props.course.lecturer,
            id: this.props.course.id
        });
    }

    render() {
        return this.props.open ? (
        <React.Fragment>
            <div className="app__modal-background" onClick={() => this.props.onClose()}/>
            <div role="dialog" className="app__modal-dialog">
            <header>
                <span>{this.props.header}</span>
                <button onClick={() => this.props.onClose()}>✗</button>
            </header>
            
            {
                this.props.isLecturer ?
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
                    <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                        <input className="mdl-textfield__input lecturer" 
                        type="text" 
                        id="lecturer" 
                        name="lecturer"
                        value={this.state.lecturer}
                        onChange={this.handleChange}
                        placeholder="Course lecturer, enter a number"/>
                    </div>
                    {
                        this.props.course.name
                            ? <button type="submit" className="mdl-button mdl-js-button submit-button" onClick={this.updateCourse}>Modify</button>
                            : <button type="submit" className="mdl-button mdl-js-button submit-button" onClick={this.createCourse}>Create</button>
                    }   
                </form> :
                (this.props.course && this.props.course.length > 0 && this.props.course.map(course => <h1 key={(Math.random() * 10000)}>{course.name} 
                    <button className="mdl-button mdl-js-button mdl-button--fab course-overview__enroll" onClick={() =>
                                console.log(course)}>
                        <i className="material-icons">library_add</i>
                    </button>
                </h1>))
            }
            </div>
        </React.Fragment>
        ) : null;
    }

    isValidCourse() {
        return this.state.name.length > 0 && this.state.description.length > 0
        && this.state.credits > 0 && this.state.lecturer > 0 && this.state.time.length > 0
        && this.state.dayOfWeek > 0 && this.state.room > 0;
    }

    handleChange = event => {
        this.setState({
        [event.target.id]: event.target.value
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

export default Modal;