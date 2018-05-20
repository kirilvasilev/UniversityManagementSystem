import { IUserModel } from '../models/UserModel';
import { RepositoryBase } from './RepositoryBase';
import { CourseSchema } from '../schemas/CourseSchema'
import { ICourseModel } from '../models/CourseModel';

export class CourseRepository extends RepositoryBase<ICourseModel> {
    constructor() {
      super(CourseSchema);
    }
  }
  
  Object.seal(CourseRepository);
  