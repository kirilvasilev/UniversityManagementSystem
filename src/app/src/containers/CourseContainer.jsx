import { connect } from 'react-redux';
import { dispatch, bindActionCreators } from 'redux';
import { deleteCourse } from '../state/courses';
import { Course } from '../components/Dashboard/Course';

const mapDispatchToProps = 
(dispatch) => bindActionCreators({
    deleteCourse
}, dispatch);

export default connect(null, mapDispatchToProps)(Course);