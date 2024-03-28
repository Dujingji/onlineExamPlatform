import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { DashBroadComponent } from './dash-broad/dash-broad.component';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { ExamsListComponent } from './exams/exams-list/exams-list.component';
import { ExamEditDialogComponent } from './dialog/exam-edit-dialog/exam-edit-dialog/exam-edit-dialog.component';
import { ExamSubmitDialogComponent } from './dialog/exam-submit-dialog/exam-submit-dialog.component';
import { DeleteDialogComponent } from './dialog/delete-dialog/delete-dialog.component';
import { PaperEditDialogComponent } from './dialog/paper-edit-dialog/paper-edit-dialog.component';
import { PapersListComponent } from './exams/papers-list/papers-list.component';
import { PaperEditerDialogComponent } from './dialog/paper-editer-dialog/paper-editer-dialog.component';
import { QuestionEditDialogComponent } from './dialog/question-edit-dialog/question-edit-dialog.component';
import { PaperSelectionDialogComponent } from './dialog/paper-selection-dialog/paper-selection-dialog.component';
import { QuestionListComponent } from './exams/question-list/question-list.component';
import { StudentsComponent } from './students/students.component';
import { StudentsExamsListComponent } from './students/students-exams-list/students-exams-list.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { ClassroomStudentsDetailComponent } from './classroom/classroom-students-detail/classroom-students-detail.component';
import { UserEditDialogComponent } from './dialog/user-edit-dialog/user-edit-dialog.component';
import { UserEditClassroomDialogComponent } from './dialog/user-edit-dialog/user-edit-classroom-dialog/user-edit-classroom-dialog.component';
import { ClassroomEditDialogComponent } from './dialog/classroom-edit-dialog/classroom-edit-dialog.component';
import { ClassroomExamEditDialogComponent } from './dialog/classroom-exam-edit-dialog/classroom-exam-edit-dialog.component';
import { SectionEditDialogComponent } from './dialog/section-edit-dialog/section-edit-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MajorComponent } from './major/major.component';
import { CollegeComponent } from './college/college.component';
import { CollegeEditDialogComponent } from './dialog/college-edit-dialog/college-edit-dialog.component';
import { CollegeAddDialogComponent } from './dialog/classroom-edit-dialog/college-add-dialog/college-add-dialog.component';
import { MajorEditDialogComponent } from './dialog/major-edit-dialog/major-edit-dialog.component';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherEditDialogComponent } from './dialog/teacher-edit-dialog/teacher-edit-dialog.component';
import { TeahcerEidtClassroomDialogComponent } from './dialog/teahcer-eidt-classroom-dialog/teahcer-eidt-classroom-dialog.component';
import { TeacherPaperEditComponent } from './dialog/teacher-paper-edit/teacher-paper-edit.component'
import { MathModule } from '../shared/math/math-service/math-service.module';
import { SafeHtmlPipeV3 } from '../shared/safe-html-v3.pipe';
import { ExerciseListComponent } from './exercise/exercise-list/exercise-list.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCN } from '../shared/MatPaginatorIntl';
import { ExerciseSectionListComponent } from './exercise/exercise-list/exercise-section-list/exercise-section-list.component';
import { ExerciseQuestionListComponent } from './exercise/exercise-list/exercise-question-list/exercise-question-list.component';
import { ExamUrlsEditDialogComponent } from './dialog/exam-edit-dialog/exam-edit-dialog/exam-urls-edit-dialog/exam-urls-edit-dialog.component';
import { FeedbackComponent } from './feedback/feedback.component';


@NgModule({
  declarations: [
    DashBroadComponent,
    SidenavComponent,
    ExamsListComponent,
    ExamEditDialogComponent,
    ExamSubmitDialogComponent,
    DeleteDialogComponent,
    PaperEditDialogComponent,
    PapersListComponent,
    PaperEditerDialogComponent,
    QuestionEditDialogComponent,
    PaperSelectionDialogComponent,
    QuestionListComponent,
    StudentsComponent,
    StudentsExamsListComponent,
    ClassroomComponent,
    ClassroomStudentsDetailComponent,
    UserEditDialogComponent,
    UserEditClassroomDialogComponent,
    ClassroomEditDialogComponent,
    ClassroomExamEditDialogComponent,
    SectionEditDialogComponent,
    MajorComponent,
    CollegeComponent,
    CollegeEditDialogComponent,
    CollegeAddDialogComponent,
    MajorEditDialogComponent,
    TeacherComponent,
    TeacherEditDialogComponent,
    TeahcerEidtClassroomDialogComponent,
    TeacherPaperEditComponent,
    ExerciseListComponent,
    SafeHtmlPipeV3,
    ExerciseSectionListComponent,
    ExerciseQuestionListComponent,
    ExamUrlsEditDialogComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMatTimepickerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatExpansionModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    MatProgressBarModule,
    MdbFormsModule,
    CKEditorModule,
    NgxSpinnerModule,
    MathModule.forRoot()
  ],
  providers: [ //注意：用useClass
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlCN }
  ],
})
export class AdminModule { }
