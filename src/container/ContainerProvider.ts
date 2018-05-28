import { AwilixContainer, createContainer, asClass, InjectionMode } from 'awilix';
import { UserRepository } from '../repositories/UserRepository';
import { BaseLogger } from '../logger/BaseLogger';
import { RepositoryBase } from '../repositories/RepositoryBase';
import { IUserModel } from '../models/UserModel';
import { ICourseModel } from '../models/CourseModel';
import { CourseRepository } from '../repositories/CourseRepository';

// Create the container and set the injectionMode to PROXY (which is also the default).


export class ContainerProvider {
    private static container: AwilixContainer;

    static registerProviders() {
        this.container = createContainer({
            injectionMode: InjectionMode.PROXY
        });
        // Register the UserRepository
        this.container.register({
            //testService: asClass(TestService),
            userRepo: asClass(UserRepository).classic()
        });

        // Register the CourseRepository
        this.container.register({
            //testService: asClass(TestService),
            courseRepo: asClass(CourseRepository).classic()
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
export function GetUserRepo(): RepositoryBase<IUserModel> {
    return ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
}

/**
 * Provires a repository using the ICourseModel interface
 */
export function GetCourseRepo(): RepositoryBase<ICourseModel> {
    return ContainerProvider.provide<RepositoryBase<ICourseModel>>('courseRepo');
}
