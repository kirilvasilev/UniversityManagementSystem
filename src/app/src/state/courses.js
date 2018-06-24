import axios from 'axios';
import store from './store';

// I choose the redux duck approach, more info here: https://github.com/erikras/ducks-modular-redux

// Constants
export const FETCH_COURSES = 'FETCH_COURSES';
export const FETCH_USER_COURSES = 'FETCH_USER_COURSES';
export const DELETE_COURSE = 'DELETE_COURSE';
export const DELETE_USER_COURSE = 'DELETE_USER_COURSE';
export const CREATE_COURSE = 'CREATE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';
export const FETCH_LECTURERS = 'FETCH_LECTURERS';
export const ADD_USER_COURSE = 'ADD_USER_COURSE';

// State
const initialState = {
    courses: [],
    userCourses: [],
    lecturers: []
}

//Actions
export const fetchCourses = () => async dispatch => {
    const localhost = "http://localhost:3000";
    try {
        axios.defaults.headers.common['Authorization'] =
            'JWT ' + localStorage.getItem('jwt');
        const rsp = await axios.get(`${localhost}/api/v1/courses`);
        dispatch({
            type: FETCH_COURSES,
            payload: rsp.data
        });
    } catch (error) {
        // handle error here
    }
}

export const fetchUserSpecificCourses = () => async dispatch => {
    const localhost = "http://localhost:3000";
    try {
        axios.defaults.headers.common['Authorization'] =
            'JWT ' + localStorage.getItem('jwt');
        const rsp = await axios.get(`${localhost}/api/v1/users/courses`);
        dispatch({
            type: FETCH_USER_COURSES,
            payload: rsp.data
        });
    } catch (error) {
        // handle error here
    }
}

export const createCourse = course => async dispatch => {
    const localhost = "http://localhost:3000";
    try {
        const rsp = await axios.post(`${localhost}/api/v1/courses`, course);
        dispatch({
            type: CREATE_COURSE,
            payload: rsp.data
        });
    } catch (error) {
        // handle error here
    }
}

export const updateCourse = course => async dispatch => {
    const localhost = "http://localhost:3000";
    const index = store.getState().courses.courses.map(course => course.id).indexOf(course.id);
    try {
        const rsp = await axios.put(`${localhost}/api/v1/courses/${course.id}`, course);
        dispatch({
            type: UPDATE_COURSE,
            payload: { data: rsp.data, index: index }
        });
    } catch (error) {
        // handle error here
    }
}

export const deleteCourse = courseId => dispatch => {
    const localhost = "http://localhost:3000";
    const index = store.getState().courses.courses.map(course => course.id).indexOf(courseId);
    try {
        axios.delete(`${localhost}/api/v1/courses/${courseId}`, {"id": courseId})
        .then(() => {
            dispatch({
                type: DELETE_COURSE,
                payload: index
            });
        });
        
    } catch (error) {
        // handle error here
    }
}

export const deleteUserCourse = courseId => dispatch => {
    const localhost = "http://localhost:3000";
    const index = store.getState().courses.courses.map(course => course.id).indexOf(courseId);
    try {
        console.log(courseId)
        axios.delete(`${localhost}/api/v1/users/courses`, {
            data: { "id": courseId } 
        }).then(() => {
            dispatch({
                type: DELETE_USER_COURSE,
                payload: index
            });
        });
    } catch (error) {
        // handle error here
    }
}

export const addUserCourse = courseId => async dispatch => {
    const localhost = "http://localhost:3000";
    const index = store.getState().courses.courses.map(course => course.id).indexOf(courseId);
    if(store.getState().courses.userCourses.map(course => course.id).length === 0){
        try {
            const rsp = await axios.post(`${localhost}/api/v1/users/courses`, {
                "id": courseId
            });
            dispatch({
                type: ADD_USER_COURSE,
                payload: store.getState().courses.courses[index]
            });     
        } catch (error) {
            // handle error here
        }
    } else {
        console.log("You are already enrolled in this course")
    }
}

export const fetchLecturers = () => async dispatch => {
    const localhost = "http://localhost:3000";
    try {
        axios.defaults.headers.common['Authorization'] =
            'JWT ' + localStorage.getItem('jwt');
        const rsp = await axios.get(`${localhost}/api/v1/users/`);
        dispatch({
            type: FETCH_LECTURERS,
            payload: rsp.data.filter(user => user.isLecturer)
        });
    } catch (error) {
        // handle error here
    }
}

// Reducer
export default function (state = initialState, action = {
    type,
    payload
}) {
    switch (action.type) {
        case FETCH_COURSES:
            return {
                ...state,
                courses: [...action.payload],
            };

        case FETCH_USER_COURSES:
            return {
                ...state,
                userCourses: [...action.payload.myCourses],
                courses: [...action.payload.otherCourses]
            };

        case CREATE_COURSE:
            return {
                ...state,
                courses: [
                    ...state.courses,
                    action.payload
                ]
            };

        case UPDATE_COURSE:
            return {
                ...state,
                courses: [
                    ...state.courses.slice(0, action.payload.index),
                    ...state.courses.slice(action.payload.index + 1),
                    action.payload.data
                ]
            };

        case DELETE_COURSE:
            return {
                ...state,
                courses: [
                    ...state.courses.slice(0, action.payload),
                    ...state.courses.slice(action.payload + 1)
                ]
            };

        case DELETE_USER_COURSE:
            return {
                ...state,
                userCourses: [
                    ...state.userCourses.slice(0, action.payload),
                    ...state.userCourses.slice(action.payload + 1)
                ]
            };
        
        case FETCH_LECTURERS:
            return {
                ...state,
                lecturers: [...action.payload]
            };

        case ADD_USER_COURSE:
            return {
                ...state,
                userCourses: [
                    ...state.userCourses,
                    action.payload
                ]
            }

        default:
            return state;
    }
}