export class Utils {
  someString: string

  constructor(someString:string) {
   this.someString = someString;
  }

  urlTransformName(){
    return this.someString.toLowerCase().replace(/[^\w\s']|_/g, '').trim().split(' ').join('-')
  }
}





