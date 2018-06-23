import React, { Component } from "react";
import "./Modal.css";

import AddCoursesContainer from '../../../containers/AddCoursesContainer';
import CreateOrUpdateCoursesContainer from '../../../containers/CreateOrUpdateCoursesContainer';

export class Modal extends Component {

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
                    this.props.isLecturer 
                    ? <CreateOrUpdateCoursesContainer course={this.props.course}/> 
                    : (this.props.course && this.props.course.length > 0 && this.props.course.map(course => <h1 key={(Math.random() * 10000)}>{course.name} 
                        <AddCoursesContainer courseId={course.id}/>
                    </h1>))
                }
            </div>
        </React.Fragment>
        ) : null;
    }

}

export default Modal;