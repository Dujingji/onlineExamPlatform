import { AuthService } from 'src/app/service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { CollegesService } from 'src/app/service/college/college.service';

@Component({
  selector: 'app-college-nav',
  templateUrl: './college-nav.component.html',
  styleUrls: ['./college-nav.component.scss']
})
export class CollegeNavComponent implements OnInit
{
  public isCollapsed : boolean = false
  public collegeName : string = ''
  public title : string = ''

  constructor(private collegesService : CollegesService, private authService : AuthService){

  }

  ngOnInit(): void {
    this.fetchCollegeName()
  }

  fetchCollegeName(){
    this.collegesService.getCollegeName(localStorage.getItem('college')!)
    .pipe(first())
    .subscribe(data =>{
      this.title = data.data
      this.collegesService.college_name = data.data
    })
  }

  logout(){
    this.authService.logout()
  }

}
