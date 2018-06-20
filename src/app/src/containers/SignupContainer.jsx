import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { signup } from '../state/auth';
import { Signup } from '../components/Signup/Signup';

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    signup
}, dispatch);

export default connect(null, mapDispatchToProps)(Signup);