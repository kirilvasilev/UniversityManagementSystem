import { DocumentQuery, Types, Model, Document } from 'mongoose';
import { IUMSModel } from '../models/IUMSModel';


export interface IRepositoryBase<T> {
    retrieve(): Promise<T[]>;
    findById(id: string, populate?: string): Promise<T>;
    findOne(cond?: Object): Promise<T>;
    find(cond?: Object, fields?: Object, options?: Object, populate?: String): Promise<T[]>;
    create(item: T): Promise<T>;
    update(_id: string, item: T): Promise<T>;
    delete(_id: string): Promise<T>;
    toObjectId(_id: string): any;
}

export class RepositoryBase<T extends IUMSModel> implements IRepositoryBase<T> {

    protected _model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this._model = schemaModel;
    }

    create(item: T): Promise<T> {
        item.createdAt = new Date()
        return this._model.create(item);
    }

    retrieve(): Promise<T[]> {
        return this._model.find({}).exec();
    }

    update(_id: string, item: T): Promise<T> {
        return this._model.findByIdAndUpdate({ _id: this.toObjectId(_id) }, item, { new: true }).exec();
    }

    delete(_id: string): Promise<T> {
        return this._model.remove({ _id: this.toObjectId(_id) }).exec();
    }

    findById(_id: string, populate?: string): Promise<T> {
        if(populate) {
            return this._model.findById(this.toObjectId(_id)).populate(populate).exec();
        }
        return this._model.findById(this.toObjectId(_id)).exec();
    }

    findOne(cond?: Object): Promise<T> {
        return this._model.findOne(cond).exec();
    }

    find(cond?: Object, fields?: Object, options?: Object, populate?: String): Promise<T[]> {
        if(populate) {
            return this._model.find(cond, fields, options).populate(populate).exec();
        }
        return this._model.find(cond, fields, options).exec();
    }

    public toObjectId(_id: string): Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id);
    }

}