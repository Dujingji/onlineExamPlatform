import { ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private CurrentMenuList : Array<menuModel> = []
  private current_index : number = 0

  get MenuList(){
    return this.CurrentMenuList
  }

  get index() : number{
    return this.current_index
  }

  set index(data : number) {
    this.current_index = data
  }

  set SetMenuList(data : Array<menuModel>){
    this.CurrentMenuList = data
  }

  constructor() { }
}

export interface menuModel{
  name: string,
  url : string
}
