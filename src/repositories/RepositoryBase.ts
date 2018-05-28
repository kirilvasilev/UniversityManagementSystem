import { DocumentQuery, Types, Model, Document } from 'mongoose';

export interface IRead<T> {
    retrieve(): DocumentQuery<T[], Document>;
    findById(id: string): DocumentQuery<T, Document>;
    findOne(cond?: Object): DocumentQuery<T, Document>;
    find(cond: Object, fields: Object, options: Object): DocumentQuery<T[], Document>;
}

export interface IWrite<T> {
    create(item: T): Promise<T>;
    update(_id: string, item: T): DocumentQuery<T, Document>;
    delete(_id: string): DocumentQuery<T, Document>;
}

export class RepositoryBase<T extends Document> implements IRead<T>, IWrite<T> {

    private _model: Model<T>;

    constructor(schemaModel: Model<T>) {
        this._model = schemaModel;
    }

    create(item: T): Promise<T> {
        return this._model.create(item);
    }

    retrieve(): DocumentQuery<T[], Document> {
        return this._model.find({});
    }

    update(_id: string, item: T): DocumentQuery<T, Document> {
        return this._model.findByIdAndUpdate({ _id: this.toObjectId(_id) }, item, { new: true });
    }

    delete(_id: string) {
        return this._model.remove({ _id: this.toObjectId(_id) });
    }

    findById(_id: string): DocumentQuery<T, Document> {
        return this._model.findById(this.toObjectId(_id));
    }

    findOne(cond?: Object): DocumentQuery<T, Document> {
        return this._model.findOne(cond);
    }

    find(cond?: Object, fields?: Object, options?: Object): DocumentQuery<T[], Document> {
        return this._model.find(cond, fields, options);
    }

    public toObjectId(_id: string): Types.ObjectId {
        return Types.ObjectId.createFromHexString(_id);
    }

}