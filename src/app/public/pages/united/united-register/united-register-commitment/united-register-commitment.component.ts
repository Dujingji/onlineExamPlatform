import { Component, EventEmitter, Output } from '@angular/core';
import { first } from 'rxjs';
import { UnitedService } from 'src/app/service/united/united.service';

@Component({
  selector: 'app-united-register-commitment',
  templateUrl: './united-register-commitment.component.html',
  styleUrls: ['./united-register-commitment.component.scss']
})
export class UnitedRegisterCommitmentComponent {

  @Output() notify: EventEmitter<number> = new EventEmitter<number>()


  constructor(private unitedService: UnitedService) {

  }

  next() {
    this.unitedService.agreement().pipe(first()).subscribe(res =>{
      this.notify.emit(1);
    })

  }
}
