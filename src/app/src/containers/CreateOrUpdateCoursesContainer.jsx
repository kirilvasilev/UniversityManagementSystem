import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { createCourse, updateCourse } from '../state/courses';
import { CreateOrUpdateCourses } from '../components/Portal/Modal/CreateOrUpdateCourses/CreateOrUpdateCourses';

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    createCourse,
    updateCourse
}, dispatch);

export default connect(null, mapDispatchToProps)(CreateOrUpdateCourses);