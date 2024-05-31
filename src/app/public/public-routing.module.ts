import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ShowExamPaperComponent } from './pages/show-exam-paper/show-exam-paper.component';
import { ExamLandingPageComponent } from './pages/exam-page/exam-landing-page/exam-landing-page.component';
import { canActivate } from '../service/router-guard';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CheckResultPageComponent } from './pages/check-result-page/check-result-page.component';
import { ExercisePageComponent } from './pages/exercise-page/exercise-page.component';
import { CalendarComponent } from '../shared/calendar/calendar.component';
import { VocabularyComponent } from './pages/vocabulary/vocabulary.component';
import { VocabularyDetailPageComponent } from './pages/vocabulary-detail/vocabulary-detail-page/vocabulary-detail-page.component';
import { VocabularyHomepageComponent } from './pages/vocabulary-homepage/vocabulary-homepage.component';
import { VocabularyCalendarComponent } from './pages/vocabulary-calendar/vocabulary-calendar.component';
import { VocabularyDetailListComponent } from './pages/vocabulary-detail-list/vocabulary-detail-list.component';

const routes: Routes = [
  {
    path: 'homePage', component: HomePageComponent, children: [
      { path: 'exam', component: ShowExamPaperComponent },
      { path: 'p/:id', component: ExamLandingPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'result', component: CheckResultPageComponent },
      { path: 'exercise', component: ExercisePageComponent },
      { path: 'daily', component: CalendarComponent },
      // { path: 'vocabulary', loadChildren: () => import('./pages/vocabulary/vocabularyModule/vocabulary.module').then((m) => m.VocabularyModule) , canActivate: [canActivate] },
      { path: 'vocabulary', component: VocabularyHomepageComponent },
      { path: 'vocabulary-study', component: VocabularyComponent },
      { path: 'vocabulary-detail/:word', component: VocabularyDetailPageComponent },
      { path: 'vocabulary-calendar', component: VocabularyCalendarComponent },
      { path: 'vocabulary-detail-list/:day/:month/:year', component: VocabularyDetailListComponent },
      { path: 'united', loadChildren: () => import('./pages/united/united.module').then((m) => m.UnitedModule), canActivate: [canActivate] }
    ],
    canActivate: [canActivate]
  },
  {
    path: 'exam',
    loadChildren: () => import('./pages/exam-page/exam-page.module').then((m) => m.ExamPageModule)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./pages/exercise/exercise/exercise.module').then((m) => m.ExerciseModule)
  },
  {
    path: 'daily_exercise',
    loadChildren: () => import('./pages/daily/daily/daily.module').then((m) => m.DailyModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
