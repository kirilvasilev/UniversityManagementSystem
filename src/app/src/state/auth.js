import axios from 'axios';

// Constants
export const LOG_IN = 'LOG_IN';
export const SIGN_UP = 'SIGN_UP';

// State
const initialState = {
    jwt: ""
}

//Actions
export const login = userCredentials => async dispatch => {
    const localhost = "http://localhost:3000";
    if(Object.keys(userCredentials).length) {
        try {
            const rsp = await axios.post(`${localhost}/login`, userCredentials);
            dispatch({
                type: LOG_IN,
                payload: rsp.data.token
            });
            window.localStorage.jwt = rsp.data.token;
            document.getElementsByClassName("header__link")[0].click();
        } catch(error) {
            // handle error here
        }
    }
}

export const signup = userCredentials => async dispatch => {
    const localhost = "http://localhost:3000";
    try {
        const rsp = await axios.post(`${localhost}/register`, userCredentials);
        console.log(rsp);
    } catch(error) {
        // handle error here
    }
}

// Reducer
export default function(state = initialState, action={type, payload}) {
    switch(action.type) {
        case LOG_IN:
            return {
                ...state,
                jwt: action.payload || 0
            };
        
        default:
            return state;
    }
}