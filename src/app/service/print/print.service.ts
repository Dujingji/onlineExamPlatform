
import { Injectable, ComponentRef, ApplicationRef } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';


@Injectable({
  providedIn: 'root'
})
export class PrintService {

  constructor() { }

  public exportAsPDF(elementId: string, pdfName: string = 'download.pdf') {
    const element = document.getElementById(elementId);
    if (element) {
      html2canvas(element, {
        scale: 2, // 增加分辨率以提高图像质量
        logging: true, // 打印日志，便于调试
        useCORS: true // 允许加载跨域图片
      }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'p', // 设置为横向
          unit: 'mm',
          format: [148, 210]
        });

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // 计算最佳缩放比例以使图像适应PDF页面尺寸
        const scaleX = pageWidth / imgWidth;
        const scaleY = pageHeight / imgHeight;
        const scale = Math.min(scaleX, scaleY); // 选取较小的比例以确保整个内容都能显示

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        // 计算居中位置
        const marginX = (pageWidth - scaledWidth) / 2;
        const marginY = (pageHeight - scaledHeight) / 2;

        pdf.addImage(imgData, 'PNG', marginX, marginY, scaledWidth, scaledHeight);
        pdf.save(pdfName);
      });
    }
  }
}
