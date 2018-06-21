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
        return new Promise<T>((resolve, reject) => resolve(this._collection.find(e => e._id == id && e.deleted == false)));
    }
    findOne(cond?: any): Promise<T> {
        var foundItems: Array<T> = [];
        if (cond != {}) {
            this._collection.forEach((element) => {
                let result = false;
                for (var key in cond) {
                    result = element[key] === cond[key];
                    if (!result) break;
                }
                if (result) {
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
        if (cond != {}) {
            if (cond !== undefined && cond.lecturer !== undefined && cond.lecturer instanceof Object)
                cond.lecturer = cond.lecturer.$in;
            this._collection.forEach((element) => {
                let result = false;
                for (var key in cond) {
                    result = element[key] === cond[key];
                    if (!result) break;
                }
                if (result) {
                    foundItems.push(element);
                }
            });
        }
        return new Promise((resolve, reject) => resolve(foundItems));
    }
    create(item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            item._id = Math.floor(Math.random() * Math.floor(12451513212)).toString();
            item.createdAt = new Date();
            this._collection.push(item);
            return resolve(item);
        });
    }
    update(id: string, item: T): Promise<T> {
        return new Promise((resolve, reject) => {
            let foundItemIndex = this._collection.findIndex(e => e._id.toString() == id);
            this._collection[foundItemIndex] = item;
            return resolve(this._collection[foundItemIndex]);
        });
    }
    delete(id: string): Promise<T> {
        return new Promise((resolve, reject) => {
            let foundItemIndex = this._collection.findIndex(e => e._id.toString() == id);
            let item = this._collection[foundItemIndex];
            item.deleted = true;
            item.deletedAt = new Date();
            return resolve(item);
        });
    }

    public toObjectId(id: string): Number {
        return +id;
    }
}

// export class RepositoryUsersMock extends RepositoryMock<IUserModelMock> {
//     /**
//      *
//      */
//     constructor() {
//         super(USERS);

//     }
// }

// export class RepositoryCoursesMock extends RepositoryMock<ICourseModelMock> {
//     /**
//      *
//      */
//     constructor() {
//         super(COURSES);

//     }
// }

