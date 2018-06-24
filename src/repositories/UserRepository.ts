import { IUserModel } from '../models/UserModel';
import { RepositoryBase, IRepositoryBase } from './RepositoryBase';
import { UserSchema } from '../schemas/UserSchema'
import { Types } from 'mongoose';

export class UserRepository extends RepositoryBase<IUserModel> {
  constructor() {
    super(UserSchema);
  }

  addCourse(id: string, item: any): Promise<IUserModel> {
    return this._model.findOneAndUpdate({_id: id}, {$push: {courses: item}}).exec();
}
}

Object.seal(UserRepository);
