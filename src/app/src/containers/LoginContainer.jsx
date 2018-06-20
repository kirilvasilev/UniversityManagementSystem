import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { login } from '../state/auth';
import { Login } from '../components/Login/Login';

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    login
}, dispatch);

export default connect(null, mapDispatchToProps)(Login);