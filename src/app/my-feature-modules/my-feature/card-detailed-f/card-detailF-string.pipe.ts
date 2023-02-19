import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cardDetailString'
})
export class CardDetailStringPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    // check data
    // console.log("value in cardDetailString =", value)
    return value.map((item:any) => item['name']).join(', ')
  }
}
