import { AwilixContainer, createContainer, asClass, InjectionMode } from 'awilix';
import { UserRepository } from '../repositories/UserRepository';

// Create the container and set the injectionMode to PROXY (which is also the default).


export class ContainerProvider {
    private static container: AwilixContainer;

    static registerProviders() {
        this.container = createContainer({
            injectionMode: InjectionMode.PROXY
          });
         // Register the classes
        this.container.register({
        //testService: asClass(TestService),
        userRepo: asClass(UserRepository).classic()
        })
    };

    static provide<T>(dep: string): T {
        return this.container.resolve<T>(dep);
    }
}

  