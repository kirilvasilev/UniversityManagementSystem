import { UserType } from "../models/UserModel";
import { IRepositoryBase } from "./RepositoryBase";
import { Types } from "mongoose";
import { ObjectId } from "bson";
import { IUserModelMock, ICourseModelMock, BaseMock } from "../models/Mocks";
import { LENGTH_REQUIRED } from "http-status-codes";

export class RepositoryMock<T extends BaseMock> implements IRepositoryBase<T>{

    /**
     *
     */
    constructor(private _collection: Array<T>) {
        
    }

    retrieve(): Promise<T[]> {
        return new Promise<T[]>((resolve, reject) => resolve(this._collection));
    }
    findById(id: string): Promise<T> {
        return new Promise<T>((resolve, reject) => resolve(this._collection.find(e => e.id.toString() == id && e.deleted == false)));
    }
    findOne(cond?: any): Promise<T> {
        var foundItems: Array<T> = [];
        if(cond != {}) {      
            this._collection.forEach( (element) => { 
                let result = false;
                for (var key in cond) {
                    result = element[key] === cond[key];
                    if(!result) break;
                }
                if(result) {
                    foundItems.push(element);
                }
            });
        }
        return new Promise((resolve, reject) => {
            return resolve(foundItems[0]);
        });
    }
    find(cond: any, fields: Object, options: Object): Promise<T[]> {
        var foundItems: Array<T> = [];
        if(cond != {}) {      
            this._collection.forEach( (element) => { 
                let result = false;
                for (var key in cond) {
                    result = element[key] === cond[key];
                    if(!result) break;
                }
                if(result) {
                    foundItems.push(element);
                }
            });
        }
        return new Promise((resolve, reject) => resolve(foundItems));       
    }
    create(item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            item.id = Math.floor(Math.random() * Math.floor(12451513212));
            item.createdAt = new Date();
            this._collection.push(item);
            return resolve(item);
        });
    }
    update(_id: string, item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            let foundItemIndex = this._collection.findIndex(e => e.id.toString() == _id);
            this._collection[foundItemIndex] = item;
            return resolve(this._collection[foundItemIndex]);
        });
    }
    delete(_id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            let foundItemIndex = this._collection.findIndex(e => e.id.toString() == _id);
            let item = this._collection[foundItemIndex];
            item.deleted = true;
            item.deletedAt = new Date();
            return resolve(item);
        });
    }

    public toObjectId(_id: string): Number {
        return +_id;
    }
}

export class RepositoryUsersMock extends RepositoryMock<IUserModelMock> {
    /**
     *
     */
    constructor() {
        super(USERS);
        
    }
}

export class RepositoryCoursesMock extends RepositoryMock<ICourseModelMock> {
    /**
     *
     */
    constructor() {
        super(COURSES);
        
    }
}

let USERS : IUserModelMock[] = [
    {
        id: 1,
        name: {
            first: "Georgi",
            last: "Georgiev"
        },
        username: "georgi",
        password: "111111",
        userType: UserType.Lecturer,
        courses: null,
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        id: 2,
        name: {
            first: "Ivailo",
            last: "Ivailov"
        },
        username: "ivailo",
        password: "111111",
        userType: UserType.Lecturer,
        courses: null,
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        id: 3,
        name: {
            first: "Ivan",
            last: "Ivanov"
        },
        username: "ivan",
        password: "111111",
        userType: UserType.Student,
        courses: [{
            creditScore: 4,
            course: 1
            },
            {
            creditScore: 3,
            course: 2
        }],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        id: 4,
        name: {
            first: "Mario",
            last: "Mariov"
        },
        username: "mario",
        password: "111111",
        userType: UserType.Student,
        courses: [{
            creditScore: 4,
            course: 1
        },
        {
            creditScore: 2,
            course: 3
        }],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        id: 5,
        name: {
            first: "Ilia",
            last: "Iliev"
        },
        username: "ilia",
        password: "111111",
        userType: UserType.Student,
        courses: [{
            creditScore: 5,
            course: 2
        },
        {
            creditScore: 4,
            course: 3
        }],
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    }
];

let COURSES : Array<ICourseModelMock> = [
    {
        id: 1,
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
        lecturer: 1,
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        id: 2,
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
        lecturer: 2,
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    },
    {
        id: 3,
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
        lecturer: 2,
        createdAt: new Date(),
        deleted: false,
        deletedAt: null
    }
]