import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { deleteCourse, deleteUserCourse } from '../state/courses';
import { Course } from '../components/Dashboard/Course';

const mapStateToProps = (state) => ({
    isLecturer: state.auth.isLecturer
 })

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    deleteCourse,
    deleteUserCourse
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Course);