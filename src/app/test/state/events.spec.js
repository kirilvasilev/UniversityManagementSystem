// import EventReducer from '../../src/state/events';
// import { FETCH_EVENTS, FETCH_MORE_EVENT_INFORMTAION } from '../../src/state/events';

// describe('Event reducer', () => {
//     it('should return the initial state', () => {
//         expect(EventReducer(undefined, {})).toEqual({
//             event: {},
//             events: [],
//             total: 0
//         })
//     });

//     it('should fetch more event information', () => {
//         expect(
//             EventReducer(undefined, {
//                 type: FETCH_MORE_EVENT_INFORMTAION,
//                 payload: {id:1, title:"test"}
//             }))
//             .toEqual({
//                 event: {id: 1, title:"test"},
//                 events: [],
//                 total: 0
//             })
//     });

//     it('should fetch events', () => {
//         expect(
//             EventReducer(undefined, {
//                 type: FETCH_EVENTS,
//                 payload: {events: [{id:1}], total:1}
//             }))
//             .toEqual({
//                 event: {},
//                 events: [{id:1}],
//                 total: 1
//             })
//     });
// });