import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { fetchCourses } from '../state/courses';
import { CourseOverview } from '../components/Dashboard/CourseOverview/CourseOverview';

const mapStateToProps = (state) => ({
   courses: state.courses
})

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    fetchCourses
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CourseOverview);