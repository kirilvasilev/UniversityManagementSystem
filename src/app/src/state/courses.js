import axios from 'axios';

// I choose the redux duck approach, more info here: https://github.com/erikras/ducks-modular-redux

// Constants
export const FETCH_COURSES = 'FETCH_COURSES';

// State
const initialState = {
    courses: {},
}

//Actions
export const fetchCourses = pageNumber => async dispatch => {
    const localhost = "http://localhost:3000";
    try {
        const rsp = await axios.get(`${localhost}/`);
        dispatch({
            type: FETCH_COURSES,
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
            return {
                ...state 
            };
        
        default:
            return state;
    }
}