import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { createCourse, updateCourse, fetchLecturers } from '../state/courses';
import { CreateOrUpdateCourses } from '../components/Portal/Modal/CreateOrUpdateCourses/CreateOrUpdateCourses';

const mapStateToProps = (state) => ({
    lecturers: state.courses.lecturers
 })

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    createCourse,
    updateCourse,
    fetchLecturers
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrUpdateCourses);