import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-delete-guest-info',
  templateUrl: './delete-guest-info.component.html',
  styleUrls: ['./delete-guest-info.component.scss']
})
export class DeleteGuestInfoComponent implements OnInit{

  public checked : boolean = false

  ngOnInit(): void {

  }

  constructor(private modalRef: NzModalRef){

  }


  close(condition: number): void {
    // Pass some data back to the major component
    if (condition)
      this.modalRef.close({checked : this.checked});
    else
      this.modalRef.close();
  }
}
