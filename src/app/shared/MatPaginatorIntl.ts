import { Injectable } from "@angular/core";
import { MatPaginatorIntl } from "@angular/material/paginator";

@Injectable() //必须有
export class MatPaginatorIntlCN extends MatPaginatorIntl { //起名为MatPaginatorIntlCN，针对中文
  override itemsPerPageLabel = '每页数量';
  override nextPageLabel = '下一页';
  override previousPageLabel = '上一页';
  override firstPageLabel = '首页';
  override lastPageLabel = '尾页';

  override getRangeLabel = function (page: number, pageSize: number, length: number) {
    if (length === 0 || pageSize === 0) {
      return '0 到 ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' / ' + length;
  };
}
