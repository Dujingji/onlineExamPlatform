import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CollegeRoutingModule } from './college-routing.module';
import { CollegeNavComponent } from './college-nav/college-nav.component';
import { CollegeHomePageComponent } from './college-home-page/college-home-page.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StudentExerciseListComponent } from './student-exercise-list/student-exercise-list.component';
import { StudentDaliyListComponent } from './student-daliy-list/student-daliy-list.component';
import { StudentVocabularyListComponent } from './student-vocabulary-list/student-vocabulary-list.component';
import { ExamsListComponent } from './exams-list/exams-list.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { CreateExamDialogComponent } from './exams-list/create-exam-dialog/create-exam-dialog.component';
import { BaiduMapComponent } from '../shared/baidu-map/baidu-map.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateClassroomDialogComponent } from './exams-list/create-classroom-dialog/create-classroom-dialog.component';
import { UnitedRegisterComponent } from './united-register/united-register.component';
import { UnitedSubjectEditorComponent } from './united-register/united-subject-editor/united-subject-editor.component';
import { UnitedPaperComponent } from './united-register/united-paper/united-paper.component';
import { GuestListComponent } from './guest-list/guest-list.component';
import { DeleteGuestInfoComponent } from './united-register/delete-guest-info/delete-guest-info.component';
import { EditStudentDialogComponent } from './college-home-page/edit-student-dialog/edit-student-dialog.component';
import { UploadDialogComponent } from './exams-list/upload-dialog/upload-dialog.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadUnitedStudentDialogComponent } from './exams-list/upload-united-student-dialog/upload-united-student-dialog.component';

@NgModule({
  declarations: [
    CollegeNavComponent,
    CollegeHomePageComponent,
    StudentExerciseListComponent,
    StudentDaliyListComponent,
    StudentVocabularyListComponent,
    ExamsListComponent,
    CreateExamDialogComponent,
    BaiduMapComponent,
    CreateClassroomDialogComponent,
    UnitedRegisterComponent,
    UnitedSubjectEditorComponent,
    UnitedPaperComponent,
    GuestListComponent,
    DeleteGuestInfoComponent,
    EditStudentDialogComponent,
    UploadDialogComponent,
    UploadUnitedStudentDialogComponent
  ],
  imports: [
    CommonModule,
    CollegeRoutingModule,
    ReactiveFormsModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzTableModule,
    NzDropDownModule,
    NzInputModule,
    FormsModule,
    NzFormModule,
    NzButtonModule,
    NzAlertModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTreeViewModule,
    NzCollapseModule,
    NzProgressModule,
    NzDatePickerModule,
    NzModalModule,
    CKEditorModule,
    NzUploadModule
  ]
})
export class CollegeModule { }
