import axios from 'axios';
import store from './store';

// Constants
export const FETCH_USERS = 'FETCH_USERS';
export const DELETE_USERS = 'DELETE_USERS';
export const UPDATE_USERS = 'UPDATE_USERS';

// State
const initialState = {
    users: []
}

//Actions
export const fetchUsers = () => async dispatch => {
    const localhost = "http://localhost:3000";
    try {
        const rsp = await axios.get(`${localhost}/api/v1/users`);
        dispatch({
            type: FETCH_USERS,
            payload: rsp.data
        });
        
    } catch(error) {
        // handle error here
    }
}

export const deleteUser = userId => dispatch => {
    const localhost = "http://localhost:3000";
    const index = store.getState().users.users.map(user => user.id).indexOf(userId);
    try {
        axios.delete(`${localhost}/api/v1/users/${userId}`)
        .then(() => {
            dispatch({
                type: DELETE_USERS,
                payload: index
            });
        });
        
    } catch(error) {
        // handle error here
    }
}

// Reducer
export default function(state = initialState, action={type, payload}) {
    switch(action.type) {
        case FETCH_USERS:
            return {
                ...state,
                users: [...action.payload]
            };

        case DELETE_USERS:
            return {
                ...state,
                users: [
                    ...state.users.slice(0, action.payload),
                    ...state.users.slice(action.payload + 1)
                ]
            };
        
        default:
            return state;
    }
}