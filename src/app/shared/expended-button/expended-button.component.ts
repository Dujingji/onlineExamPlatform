import { Dialog } from '@angular/cdk/dialog';
import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FeedbackDialogComponent } from 'src/app/dialog/dialog/feedback-dialog/feedback-dialog.component';
import { ExerciseService } from 'src/app/service/exercise/exercise.service';

@Component({
  selector: 'app-expended-button',
  templateUrl: './expended-button.component.html',
  styleUrls: ['./expended-button.component.scss']
})
export class ExpendedButtonComponent {

  @Input()
  exc_id? : string

  @Input()
  exc_d_id? : string

  @Input()
  index? : number

  menuOpen = false;

  reverseDirection = false;

  @ViewChild('dropDownMenu', { static: true })
  dropDownMenu! : ElementRef

  @HostListener('window:resize')
  onWindowResize() {
    // 当窗口大小改变时，重新判断是否需要反向展开
    if (this.menuOpen) {
      this.adjustDropdownDirection();
    }
  }

  constructor(private dialog: MatDialog, private exerciseService : ExerciseService, private el: ElementRef){

  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    setTimeout(() => { // 确保视图已经更新
      this.adjustDropdownDirection();
    });
  }

  adjustDropdownDirection() {
    const menuElement = this.dropDownMenu.nativeElement;
    const menuRight = menuElement.getBoundingClientRect().right;

    const viewportWidth = window.innerWidth;
    console.log(window.innerWidth)
    console.log((menuRight + 350) > viewportWidth)
    // 如果下拉菜单的底部将要超出视窗，则反向展开
    this.reverseDirection = (menuRight + 350) > viewportWidth;
  }

  openDialogButton() {
    let dialogRef = this.dialog.open(FeedbackDialogComponent, {
    })

    dialogRef.afterClosed().subscribe(result => {
      if (this.exc_id && this.exc_d_id && result && this.index)
        this.exerciseService.postFeedBack(this.exc_id, this.exc_d_id, this.index, localStorage.getItem('information')!, result)
          .subscribe(data => {
            if (data.status){
              alert("提交成功！")
            }else{
              alert("提交失败！")
            }
        })

      // 可以根据需要处理结果
    });
  }
}
