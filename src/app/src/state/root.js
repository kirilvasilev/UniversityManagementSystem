import { combineReducers } from 'redux';
import CourseReducer from './courses';
import AuthReducer from './auth';
import UserReducer from './users';

export default combineReducers({
    courses: CourseReducer,
    auth: AuthReducer,
    users: UserReducer
});