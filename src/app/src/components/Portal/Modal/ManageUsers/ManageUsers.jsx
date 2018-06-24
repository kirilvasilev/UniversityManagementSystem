import React from 'react';
import "./ManageUsers.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


export class ManageUsers extends React.Component {

    componentWillMount() {
        this.props.fetchUsers();
    }

    render() {
        return (
            <React.Fragment>
            {
                <table className="mdl-data-table mdl-js-data-table mdl-shadow--2dp modal__users-management">
                <thead>
                <tr>
                    <th className="mdl-data-table__cell">No.</th>
                    <th className="mdl-data-table__cell--non-numeric">User name</th>
                    <th className="mdl-data-table__cell--non-numeric">Lecturer</th>
                    <th className="mdl-data-table__cell--non-numeric"></th>
                </tr>
                </thead>
                <tbody>
                {
                
                (this.props.users && this.props.users.length > 0) ?
                this.props.users.sort((a, b) => {
                    let nameA = a.firstName.toUpperCase(); // ignore upper and lowercase
                    let nameB = b.firstName.toUpperCase(); // ignore upper and lowercase
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                  
                    // names must be equal
                    return 0;
                  }).map((user, i) => 
                <tr key={i}>
                    <td className="mdl-data-table__cell">{i+1}</td>
                    <td className="mdl-data-table__cell--non-numeric">{user.firstName} {user.lastName}</td>
                    <td className="mdl-data-table__cell--non-numeric">
                    <label className="mdl-switch mdl-js-switch mdl-js-ripple-effect" htmlFor="isLecuter">
                        <input type="checkbox" className="mdl-checkbox__input" checked={user.isLecturer} onChange={() => {
                                 this.updateUser(user.id, user.isLecturer);
                             }}/>
                        <span className="mdl-switch__label"></span>
                    </label>
                    </td>
                    <td className="mdl-data-table__cell--non-numeric">
                        <button className="mdl-button mdl-js-button mdl-button--icon" onClick={() => {
                                 this.deleteUser(user.id)
                             }}>
                            <i className="material-icons">delete_forever</i>
                            <div className="mdl-tooltip" data-mdl-for="delete-user">Delete user</div>
                        </button>
                    </td>
                </tr>): null
                }
                </tbody>
                </table>
            }
            </React.Fragment>

        );
    }

    deleteUser(id) {
        this.props.deleteUser(id);
    }

    updateUser(id, isLecturer) {
        
        let userIndex = this.props.users.findIndex(user => user.id == id);
        this.props.users[userIndex].isLecturer = !isLecturer;
        this.props.updateUser(id, isLecturer)
    }
}

ManageUsers.propTypes = {
}

export default ManageUsers;