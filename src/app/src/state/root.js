import { combineReducers } from 'redux';
import CourseReducer from './courses';
import AuthReducer from './auth';

export default combineReducers({
    courses: CourseReducer,
    auth: AuthReducer
});