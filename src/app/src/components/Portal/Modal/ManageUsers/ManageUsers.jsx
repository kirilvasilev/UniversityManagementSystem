import React from 'react';
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
                (this.props.users && this.props.users.length > 0)
                ? this.props.users.map(user => <h1 key={(Math.random() * 10000)}>
                        {user.firstName} {user.lastName} {user.isLecturer ? <span>yes</span> : <span>No</span>}
                        <button className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect" onClick={() => {
                                this.deleteUser(user.id)
                            }}>
                                <i className="material-icons">delete</i>
                            </button>
                        </h1>
                    )
                : <h1>test</h1>
            }
            </React.Fragment>

        );
    }

    deleteUser(id) {
        this.props.deleteUser(id);
    }


}

ManageUsers.propTypes = {
}

export default ManageUsers;