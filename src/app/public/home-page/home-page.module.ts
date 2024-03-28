import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

import { HomePageComponent } from './home-page.component';
import { ShowExamPaperComponent } from '../pages/show-exam-paper/show-exam-paper.component';
import { ExamLandingPageComponent } from '../pages/exam-page/exam-landing-page/exam-landing-page.component';
import { RegisterPageComponent } from '../pages/register-page/register-page.component';
import { CheckResultPageComponent } from '../pages/check-result-page/check-result-page.component';
import { NotExamsPageComponent } from 'src/app/shared/not-exams-page/not-exams-page.component';
import { NotResultPageComponent } from 'src/app/shared/not-result-page/not-result-page.component';
import { ExercisePageComponent } from '../pages/exercise-page/exercise-page.component';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CalendarComponent } from 'src/app/shared/calendar/calendar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { VideoSelecteDialogComponent } from '../pages/check-result-page/video-selecte-dialog/video-selecte-dialog.component';
import { VocabularyCardComponent } from 'src/app/shared/vocabulary-card/vocabulary-card.component';
import { VocabularyComponent } from '../pages/vocabulary/vocabulary.component';
import { SafeHtmlPipeV6 } from 'src/app/shared/safe-html-v6.pipe';
import { HighlightPipe } from 'src/app/shared/hightlight.pipe';
import { VocabularyDetailPageComponent } from '../pages/vocabulary-detail/vocabulary-detail-page/vocabulary-detail-page.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { VocabularyHomepageComponent } from '../pages/vocabulary-homepage/vocabulary-homepage.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { VocabularyCalendarComponent } from '../pages/vocabulary-calendar/vocabulary-calendar.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ShowExamPaperComponent,
    ExamLandingPageComponent,
    RegisterPageComponent,
    CheckResultPageComponent,
    NotExamsPageComponent,
    NotResultPageComponent,
    ExercisePageComponent,
    CalendarComponent,
    VideoSelecteDialogComponent,
    VocabularyCardComponent,
    VocabularyComponent,
    SafeHtmlPipeV6,
    HighlightPipe,
    VocabularyDetailPageComponent,
    VocabularyHomepageComponent,
    VocabularyCalendarComponent
  ],
  exports: [],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatProgressBarModule
  ],
  providers: []
})
export class HomePageModule { }
