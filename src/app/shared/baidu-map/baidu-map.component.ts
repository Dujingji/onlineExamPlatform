import { Component, OnInit } from '@angular/core';
declare const BMap: any;

@Component({
  selector: 'app-baidu-map',
  templateUrl: './baidu-map.component.html',
  styleUrls: ['./baidu-map.component.scss']
})
export class BaiduMapComponent implements OnInit {


  map: any;

  ngOnInit() {
    this.initMap();
  }

  constructor() { }

  initMap() {
    // 创建地图实例
    this.map = new BMap.Map("map");
    // 设置中心点坐标
    const point = new BMap.Point(116.404, 39.915);
    // 地图初始化，同时设置地图展示级别
    this.map.centerAndZoom(point, 15);
  }

}
