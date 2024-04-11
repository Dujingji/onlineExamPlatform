import { ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private CurrentMenuList: Array<menuModel> = []
  private current_index: number = 0
  private menuList: Map<string, menuModel> = new Map([])

  get MenuList() {
    return this.CurrentMenuList
  }

  get index(): number {
    return this.current_index
  }

  set index(data: number) {
    this.current_index = data
  }

  set SetMenuList(data: Array<menuModel>) {
    this.CurrentMenuList = data
  }

  get AllMenuList() {
    return this.menuList
  }

  constructor() {
    this.menuList.set('/public/homePage/daily', { name: '每日一练', group: 1, url: '/public/homePage/daily' })
    this.menuList.set('/public/homePage/vocabulary', { name: '单词打卡', group: 1, url: '/public/homePage/vocabulary' })
    this.menuList.set('/public/homePage/exercise', { name: '专项练习', group: 1, url: '/public/homePage/exercise' })
    this.menuList.set('/public/homePage/exam', { name: '待考事项', group: 2, url: '/public/homePage/exam' })
    this.menuList.set('/public/homePage/register', { name: '报考页面', group: 2, url: '/public/homePage/register' })
    this.menuList.set('/public/homePage/result', {name : '成绩查询', group: 3, url: ''})
  }
}

export interface menuModel {
  name: string,
  group: number,
  url: string
}
