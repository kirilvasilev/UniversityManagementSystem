import { NgModule } from '@angular/core';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';

@NgModule({
  imports: [
    UsersRoutingModule
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
