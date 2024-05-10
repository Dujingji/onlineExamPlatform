import { ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private CurrentMenuList: Array<menuModel> = []
  private current_index: number = 0
  private menuList: Map<string, menuModel> = new Map([])
  private menuItemList: menuItemModel[] = []

  get MenuItem() {
    return this.menuItemList
  }

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

  createMenuItemList(role: string): menuItemModel[] {
    if (role === 'guest') {
      this.menuItemList = []
      this.menuItemList.push({ name: '联考信息', icon: 'library_books', url: '/public/homePage/united' });
      this.menuItemList.push({ name: '联考报名', icon: 'collections_bookmark', url: '/public/homePage/united/register' });
      this.menuItemList.push({ name: '成绩查询', icon: 'star', url: '/public/homePage/united/result' });
    }
    else if (role === 'student') {
      this.menuItemList = []
      this.menuItemList.push({ name: '练习模块', icon: 'today', url: '/public/homePage/daily' });
      this.menuItemList.push({ name: '线上考试', icon: 'home', url: '/public/homePage/exam' });
      this.menuItemList.push({ name: '查询成绩', icon: 'person', url: '/public/homePage/result' });
      this.menuItemList.push({ name: '联考信息', icon: 'library_books', url: '/public/homePage/united' });
      this.menuItemList.push({ name: '联考报名', icon: 'collections_bookmark', url: '/public/homePage/united/register' });
      this.menuItemList.push({ name: '联考成绩查询', icon: 'star', url: '/public/homePage/united/result' });
    } else {
      this.menuItemList = []
      this.menuItemList.push({ name: '联考信息', icon: 'library_books', url: '/public/homePage/united' });
      this.menuItemList.push({ name: '联考报名', icon: 'collections_bookmark', url: '/public/homePage/united/register' });
      this.menuItemList.push({ name: '成绩查询', icon: 'star', url: '/public/homePage/united/result' });
    }

    return this.menuItemList
  }

  constructor() {
    this.menuList.set('/public/homePage/daily', { name: '每日一练', group: 1, url: '/public/homePage/daily' });
    this.menuList.set('/public/homePage/vocabulary', { name: '单词打卡', group: 1, url: '/public/homePage/vocabulary' });
    this.menuList.set('/public/homePage/exercise', { name: '专项练习', group: 1, url: '/public/homePage/exercise' });
    this.menuList.set('/public/homePage/exam', { name: '待考事项', group: 2, url: '/public/homePage/exam' });
    this.menuList.set('/public/homePage/register', { name: '报考页面', group: 2, url: '/public/homePage/register' });
    this.menuList.set('/public/homePage/result', { name: '成绩查询', group: 3, url: '' });
  }
}

export interface menuModel {
  name: string,
  group: number,
  url: string
}

export interface menuItemModel {
  icon: string,
  url: string,
  name: string
}
