import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UnitedRoutesModule } from './united.routing';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { UnitedComponent } from './united/united.component';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NzListModule } from 'ng-zorro-antd/list';
import { UnitedRegisterComponent } from './united-register/united-register.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { UnitedRegisterInfoComponent } from './united-register/united-register-info/united-register-info.component';
import { UnitedRegisterCommitmentComponent } from './united-register/united-register-commitment/united-register-commitment.component';
import { UnitedExamResultComponent } from './united-register/united-exam-result/united-exam-result.component';
import { UnitedRegisterUserInfoComponent } from './united-register/united-register-user-info/united-register-user-info.component';
import { UnitedRegisterPaidComponent } from './united-register/united-register-paid/united-register-paid.component';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { UnitedResultComponent } from './united-result/united-result.component';

@NgModule({
  declarations: [
    UnitedComponent,
    UnitedRegisterComponent,
    UnitedRegisterInfoComponent,
    UnitedRegisterCommitmentComponent,
    UnitedExamResultComponent,
    UnitedRegisterUserInfoComponent,
    UnitedRegisterPaidComponent,
    UnitedResultComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    UnitedRoutesModule,
    NzDescriptionsModule,
    NzBadgeModule,
    MatIconModule,
    MatDividerModule,
    NzListModule,
    NzCardModule,
    NzButtonModule,
    NzStepsModule,
    NzRadioModule,
    FormsModule,
    NzSpinModule,
    ReactiveFormsModule,
    NzFormModule,
    NzUploadModule,
    NzInputModule,
    NzIconModule,
    NzAlertModule,
    NzSelectModule,
    NzModalModule,
    NzImageModule,
    NzResultModule,
    NzEmptyModule
  ]
})
export class UnitedModule { }
