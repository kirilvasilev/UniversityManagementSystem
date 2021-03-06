import React, { Component } from "react";
import "./Modal.css";

import AddCoursesContainer from '../../../containers/AddCoursesContainer';
import CreateOrUpdateCoursesContainer from '../../../containers/CreateOrUpdateCoursesContainer';
import ManageUsersContainer from '../../../containers/ManageUsersContainer';

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
                    this.props.manageUsers ?
                    <ManageUsersContainer/> :
                    this.props.isLecturer 
                    ? <CreateOrUpdateCoursesContainer course={this.props.course} onClose={() => this.props.onClose()}/> 
                    : (this.props.course && this.props.course.length > 0 && this.props.course.map(course => <h1 key={(Math.random() * 10000)}>{course.name} 
                        <AddCoursesContainer courseId={course.id} onClose={() => this.props.onClose()}/>
                    </h1>))
                }
            </div>
        </React.Fragment>
        ) : null;
    }

}

export default Modal;