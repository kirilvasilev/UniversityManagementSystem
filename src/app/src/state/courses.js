import axios from 'axios';

// I choose the redux duck approach, more info here: https://github.com/erikras/ducks-modular-redux

// Constants
export const FETCH_COURSES = 'FETCH_COURSES';
export const CREATE_COURSE = 'CREATE_COURSE';
export const DELETE_COURSE = 'DELETE_COURSE';
export const UPDATE_COURSE = 'UPDATE_COURSE';

// State
const initialState = {
    courses: []
}

//Actions
export const fetchCourses = pageNumber => async dispatch => {
    const localhost = "http://localhost:3000";
    try {
        axios.defaults.headers.common['Authorization'] = 
                                'JWT ' + localStorage.getItem('jwt');
        const rsp = await axios.get(`${localhost}/api/v1/courses`);
        dispatch({
            type: FETCH_COURSES,
            payload: rsp.data
        });
    } catch(error) {
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
    } catch(error) {
        // handle error here
    }
}

export const updateCourse = course => async dispatch => {
    const localhost = "http://localhost:3000";
    const userId = 1;  //get id from user
    try {
        const rsp = await axios.put(`${localhost}/api/v1/${userId}`, course);
        dispatch({
            type: UPDATE_COURSE,
            payload: rsp.data
        });
    } catch(error) {
        // handle error here
    }
}

export const deleteCourse = courseId => async dispatch => {
    const localhost = "http://localhost:3000";
    const userId = 1;  //get id from user
    try {
        const rsp = await axios.delete(`${localhost}/api/v1/${userId}`, {"id": courseId});
        dispatch({
            type: DELETE_COURSE,
            payload: rsp.data
        });
    } catch(error) {
        // handle error here
    }
}

// Reducer
export default function(state = initialState, action={type, payload}) {
    switch(action.type) {
        case FETCH_COURSES:
            return [
                ...action.payload
            ];
        
        default:
            return state;
    }
}