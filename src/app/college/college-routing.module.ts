import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { canActivate } from 'src/app/service/router-guard';
import { CollegeNavComponent } from './college-nav/college-nav.component';
import { CollegeHomePageComponent } from './college-home-page/college-home-page.component';
import { StudentExerciseListComponent } from './student-exercise-list/student-exercise-list.component';
import { StudentDaliyListComponent } from './student-daliy-list/student-daliy-list.component';
import { StudentVocabularyListComponent } from './student-vocabulary-list/student-vocabulary-list.component';
import { ExamsListComponent } from './exams-list/exams-list.component';
import { UnitedRegisterComponent } from './united-register/united-register.component';

const routes: Routes = [
  {

    path: '', component: CollegeNavComponent,
    children: [{
      path: '', component: CollegeHomePageComponent
    },
    {
      path: 'student-exercise-list', component: StudentExerciseListComponent
    },
    {
      path: 'student-daily-list', component: StudentDaliyListComponent
    },
    {
      path: 'student-vocabulary-list', component: StudentVocabularyListComponent
    },
    {
      path: 'exam-list', component: ExamsListComponent
    },
    {
      path: 'register-student', component: UnitedRegisterComponent
    }
  ],
    canActivate: [canActivate]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollegeRoutingModule { }
