export class FileUploadAdapter {
  loader;
  http;
  editor;
  constructor(loader : any, editor : any) {
    this.loader = loader;
    this.editor = editor;
    // 获取传入的http模块
    this.http = this.editor.config.get('http');
  }
  upload() {
    const data = new FormData();
    // 表单name为file，和后端app.js中的 req.files.file 相对应
    data.append('file', this.loader.file);
    return new Promise((resolve, reject) => {
      this.http.post(
        'https://exam.bodaoedu.com/exam-api/upload-image',
        data)
        .subscribe(
          (data: { imgPath: any; }) => {
            console.log(data)
            resolve({
              imgPath: data.imgPath
            });
          },
          (err: any) => reject(err));
    });
  }
  abort() {
  }
}
export function CustomUploadAdapterPlugin(editor : any) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader : any) => {
    // 将 editor 对象也注入其中
    return new FileUploadAdapter(loader, editor);
  };
}
