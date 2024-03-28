export class qType{
  public type : string[] = []
  public desc : string[] = []

  constructor(){
    this.type.push('单项选择题')
    this.type.push('多项选择题')
    this.type.push('填空题')
    this.type.push('简答题')
  }

  getTypeLength() : number{
    return this.type.length
  }
}
