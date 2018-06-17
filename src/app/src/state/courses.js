import axios from 'axios';

// I choose the redux duck approach, more info here: https://github.com/erikras/ducks-modular-redux

// Constants
export const FETCH_COURSES = 'FETCH_COURSES';

// State
const initialState = {
    courses: [
        {
            id: 1,
            name: "Informatika",
            description: "Learn about computer software, networks, programming languages, data structures and more.",
            schedules: [{
                dayOfWeek: 1,
                time: "11:30:00",
                room: "301"
            },
            {
                dayOfWeek: 1,
                time: "12:30:00",
                room: "302"
            }],
            credits: 5,
            lecturer: 1,
            createdAt: new Date(),
            deleted: false,
            deletedAt: null
        },
        {
            id: 2,
            name: "Statistika",
            description: "Learn about statistical modals, how to create graphs, use data, analyse information and create charts.",
            schedules: [{
                dayOfWeek: 1,
                time: "11:30:00",
                room: "101"
            },
            {
                dayOfWeek: 2,
                time: "11:30:00",
                room: "101"
            },
            {
                dayOfWeek: 4,
                time: "11:30:00",
                room: "101"
            }],
            credits: 5,
            lecturer: 2,
            createdAt: new Date(),
            deleted: false,
            deletedAt: null
        },
        {
            id: 3,
            name: "Matematika",
            description: "Learn all about mathematics. Analytics geometry, deferential and intergral calculas. Even more complecated mathematical structures and models.",
            schedules: [{
                dayOfWeek: 1,
                time: "15:30:00",
                room: "301"
            },
            {
                dayOfWeek: 1,
                time: "16:30:00",
                room: "201"
            }],
            credits: 5,
            lecturer: 2,
            createdAt: new Date(),
            deleted: false,
            deletedAt: null
        },
        {
            id: 4,
            name: "Informatika",
            description: "Learn about computer software, networks, programming languages, data structures and more.",
            schedules: [{
                dayOfWeek: 1,
                time: "11:30:00",
                room: "301"
            },
            {
                dayOfWeek: 1,
                time: "12:30:00",
                room: "302"
            }],
            credits: 5,
            lecturer: 1,
            createdAt: new Date(),
            deleted: false,
            deletedAt: null
        },
        {
            id: 5,
            name: "Statistika",
            description: "Learn about statistical modals, how to create graphs, use data, analyse information and create charts.",
            schedules: [{
                dayOfWeek: 1,
                time: "11:30:00",
                room: "101"
            },
            {
                dayOfWeek: 2,
                time: "11:30:00",
                room: "101"
            },
            {
                dayOfWeek: 4,
                time: "11:30:00",
                room: "101"
            }],
            credits: 5,
            lecturer: 2,
            createdAt: new Date(),
            deleted: false,
            deletedAt: null
        },
        {
            id: 6,
            name: "Matematika",
            description: "Learn all about mathematics. Analytics geometry, deferential and intergral calculas. Even more complecated mathematical structures and models.",
            schedules: [{
                dayOfWeek: 1,
                time: "15:30:00",
                room: "301"
            },
            {
                dayOfWeek: 1,
                time: "16:30:00",
                room: "201"
            }],
            credits: 5,
            lecturer: 2,
            createdAt: new Date(),
            deleted: false,
            deletedAt: null
        }
    ]
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