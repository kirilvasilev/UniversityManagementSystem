import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { fetchUsers, deleteUser } from '../state/users';
import { ManageUsers } from '../components/Portal/Modal/ManageUsers/ManageUsers';

const mapStateToProps = (state) => ({
    users: state.users.users
 })

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    fetchUsers,
    deleteUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);