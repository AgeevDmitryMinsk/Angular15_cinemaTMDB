import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'voteToPercent'
})
export class VoteToPercentPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {

    return Math.round(value*10);
  }
}
