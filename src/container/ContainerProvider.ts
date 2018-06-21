import { AwilixContainer, createContainer, asClass, InjectionMode } from 'awilix';
import { UserRepository } from '../repositories/UserRepository';
import { BaseLogger } from '../logger/BaseLogger';
import { RepositoryBase, IRepositoryBase } from '../repositories/RepositoryBase';
import { IUserModel } from '../models/UserModel';
import { ICourseModel } from '../models/CourseModel';
import { CourseRepository } from '../repositories/CourseRepository';

import { IUserModelMock, ICourseModelMock } from '../models/Mocks';

// Create the container and set the injectionMode to PROXY (which is also the default).


export class ContainerProvider {
    private static container: AwilixContainer;

    static registerProviders() {
        this.container = createContainer({
            injectionMode: InjectionMode.PROXY
        });
        // Register the UserRepository
        this.container.register({
            RepoUsers: asClass(UserRepository).classic()
        });

        // Register the CourseRepository
        this.container.register({
            RepoCourse: asClass(CourseRepository).classic()
        });

        // Register the Logger
        this.container.register({
            logger: asClass(BaseLogger).classic()
        });

    };

    /**
     * Provides a resolved instance of the passed dependency
     * @param dep Named registration pair
     */
    static provide<T>(dep: string): T {
        return this.container.resolve<T>(dep);
    }

};

/**
 * Provires a repository using the IUserModel interface
 */
export function GetUserRepo(): IRepositoryBase<IUserModel> {
    return ContainerProvider.provide<IRepositoryBase<IUserModel>>('RepoUsers');
}

/**
 * Provires a repository using the ICourseModel interface
 */
export function GetCourseRepo(): IRepositoryBase<ICourseModel> {
    return ContainerProvider.provide<IRepositoryBase<ICourseModel>>('RepoCourse');
}
