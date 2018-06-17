import { combineReducers } from 'redux';
import CourseReducer from './courses';

export default combineReducers({
    courses: CourseReducer
});