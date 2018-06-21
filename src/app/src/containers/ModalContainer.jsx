import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { createCourse, updateCourse } from '../state/courses';
import { Modal } from '../components/Portal/Modal/Modal';

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    createCourse,
    updateCourse
}, dispatch);

export default connect(null, mapDispatchToProps)(Modal);