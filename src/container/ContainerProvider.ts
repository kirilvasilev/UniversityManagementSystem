import { AwilixContainer, createContainer, asClass, InjectionMode } from 'awilix';
import { UserRepository } from '../repositories/UserRepository';
import { BaseLogger } from '../logger/BaseLogger';
import { RepositoryBase } from '../repositories/RepositoryBase';
import { IUserModel } from '../models/UserModel';

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

        // Register the Logger
        this.container.register({
            logger: asClass(BaseLogger).classic()
            });

    };

    static provide<T>(dep: string): T {
        return this.container.resolve<T>(dep);
    }
   
};


export function GetUserRepo(): RepositoryBase<IUserModel>{
    return ContainerProvider.provide<RepositoryBase<IUserModel>>('userRepo');
}
  