import { IUserModel } from '../models/UserModel';
import { RepositoryBase } from './RepositoryBase';
import { UserSchema } from '../schemas/UserSchema'

export class UserRepository extends RepositoryBase<IUserModel> {
    constructor() {
      super(UserSchema);
    }
  }
  
  Object.seal(UserRepository);
  