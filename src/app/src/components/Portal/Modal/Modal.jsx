import React, { Component } from "react";
import "./Modal.css";

class Modal extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
      schedules: [{
        dayOfWeek: 1,
        time: "00:00:00",
        room: ""
      }],
      credits: "",
      lecturer: "",
    };
}

isValidCourse() {
    return this.state.name.length > 0 && this.state.description.length > 0
    && this.state.credits > 0 && this.state.lecturer > 0 && this.state.schedules.length > 0;
}

handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
}

createCourse = event => {
    event.preventDefault();
    if(this.isValidCourse()) {
        console.log({
            "name": this.state.name,
            "description": this.state.description,
            "schedules": this.state.schedules,
            "credits": this.state.credits,
            "lecturer": this.state.lecturer
        });
    } else {
        console.log("Invalid course creation, please fill in all the missing fields");
    }
}

  render() {
    return this.props.open ? (
      <React.Fragment>
        <div className="app__modal-background" onClick={() => this.props.onClose()}/>
        <div role="dialog" className="app__modal-dialog">
          <header>
            <span>{this.props.header}</span>
            <button onClick={() => this.props.onClose()}>✗ </button>
          </header>

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
                    value={this.state.schedules.dayOfWeek}
                    onChange={this.handleChange}
                    placeholder="Day of the week in number: 1-7"/>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input time" 
                    type="text" 
                    id="time" 
                    name="time"
                    value={this.state.schedules.time}
                    onChange={this.handleChange}
                    placeholder="Time: hh:mm:ss"/>
                </div>
                <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                    <input className="mdl-textfield__input room" 
                    type="text" 
                    id="room" 
                    name="room"
                    value={this.state.schedules.room}
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
                
                <button type="submit" className="mdl-button mdl-js-button submit-button" onClick={this.createCourse}>Create</button>    
            </form>
        </div>
      </React.Fragment>
    ) : null;
  }
}

export default Modal;