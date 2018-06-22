import { UserType } from "../models/UserModel";

export let USERS: Array<any> = [
    {
        name: {
            first: "admin",
            last: "admin"
        },
        username: "admin",
        password: "admin",
        userType: UserType.Lecturer,
        courses: [],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        name: {
            first: "Georgi",
            last: "Georgiev"
        },
        username: "georgi",
        password: "111111",
        userType: UserType.Lecturer,
        courses: [],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        name: {
            first: "Ivailo",
            last: "Ivailov"
        },
        username: "ivailo",
        password: "111111",
        userType: UserType.Lecturer,
        courses: [],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        name: {
            first: "Ivan",
            last: "Ivanov"
        },
        username: "ivan",
        password: "111111",
        userType: UserType.Student,
        courses: [],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        name: {
            first: "Mario",
            last: "Mariov"
        },
        username: "mario",
        password: "111111",
        userType: UserType.Student,
        courses: [],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        name: {
            first: "Ilia",
            last: "Iliev"
        },
        username: "ilia",
        password: "111111",
        userType: UserType.Student,
        courses: [],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    }
];
export let COURSES: Array<any> = [
    {
        name: "Informatika",
        description: "",
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
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        name: "Statistika",
        description: "",
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
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        name: "Matematika",
        description: "",
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
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    }
];