import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBroadComponent } from './dash-broad/dash-broad.component';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { PapersListComponent } from './exams/papers-list/papers-list.component';
import { StudentsComponent } from './students/students.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { canActivate } from '../service/router-guard';
import { MajorComponent } from './major/major.component';
import { CollegeComponent } from './college/college.component';
import { PapersViewComponent } from './exams/papers-list/papers-view/papers-view.component';
import { PapersContentComponent } from './exams/papers-list/papers-view/papers-content/papers-content.component';
import { TeacherComponent } from './teacher/teacher.component';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {
    path: '', component: SidenavComponent, children: [
      { path: '', component: DashBroadComponent },
      { path: 'paper-list', component: PapersListComponent },
      { path: 'student-list', component: StudentsComponent },
      { path: 'classroom-list', component: ClassroomComponent },
      { path: 'major-list', component: MajorComponent},
      { path: 'college-list', component: CollegeComponent},
      { path: 'teacher-list', component: TeacherComponent},
      { path: 'exc', component: ExerciseListComponent},
      { path: 'feedback', component: FeedbackComponent}
    ],
    canActivate: [canActivate]
  },
  {
    path: 'paperView/:id', component: PapersViewComponent, children: [
      { path: '', component: PapersContentComponent }
    ],
    canActivate: [canActivate]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes),],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
