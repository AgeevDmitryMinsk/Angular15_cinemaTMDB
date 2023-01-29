import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesToHHMM'
})
export class MinutesToHHMMPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    console.log('value in MinutesToHHMMPipe = ', value)

    let hours = value/60;

    let roundedHours = Math.floor(hours)

    let minutes = value%60

    return `${roundedHours}h ${minutes}m`;
  }

}
