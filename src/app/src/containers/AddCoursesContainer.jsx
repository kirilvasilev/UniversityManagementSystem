import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { addUserCourse } from '../state/courses';
import { AddCourses } from '../components/Portal/Modal/AddCourses/AddCourses';

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    addUserCourse
}, dispatch);

export default connect(null, mapDispatchToProps)(AddCourses);