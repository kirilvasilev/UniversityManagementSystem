import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { fetchCourses, fetchUserSpecificCourses } from '../state/courses';
import { CourseOverview } from '../components/Dashboard/CourseOverview/CourseOverview';

const mapStateToProps = (state) => ({
   courses: state.courses.courses,
   userCourses: state.courses.userCourses,
   auth: state.auth
})

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    fetchCourses,
    fetchUserSpecificCourses
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CourseOverview);