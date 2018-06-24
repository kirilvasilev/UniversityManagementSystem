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
                <table className="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp modal__users-management">
                <thead className="table-header">
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
                    <div className="md-checkbox">
                        <input id={"cb"+i} type="checkbox" checked={user.isLecturer} onChange={() => {
                                 this.updateUser(user.id, user.isLecturer);
                             }}/>
                        <label htmlFor={"cb"+i}></label>
                    </div>
                    </td>
                    <td className="mdl-data-table__cell--non-numeric">
                        <button data-tooltip="Delete user" className="mdl-button mdl-js-button mdl-button--icon btn-table-delete" onClick={() => {
                                 this.deleteUser(user.id)
                             }}>
                            <i className="material-icons btn-delete-icon">delete_forever</i>

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
        this.props.updateUser(id, !isLecturer)
    }
}

ManageUsers.propTypes = {
}

export default ManageUsers;