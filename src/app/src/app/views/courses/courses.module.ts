import { NgModule } from '@angular/core';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';

@NgModule({
  imports: [
    CoursesRoutingModule
  ],
  declarations: [CoursesComponent]
})
export class CoursesModule { }
