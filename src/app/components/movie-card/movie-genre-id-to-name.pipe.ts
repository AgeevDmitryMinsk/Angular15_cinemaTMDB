import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'movieGenreIdToName'
})
export class MovieGenreIdToNamePipe implements PipeTransform {


  transform(value: number[], ...args: number[]): string[] {

    let result = []
    if (value.includes(28)) result.push('Action')
    if (value.includes(12)) result.push(' Adventure')
    if (value.includes(16)) result.push(' Animation')
    if (value.includes(35)) result.push(' Comedy')
    if (value.includes(80)) result.push(' Crime')
    if (value.includes(99)) result.push(' Documentary')
    if (value.includes(18)) result.push(' Drama')
    if (value.includes(10751)) result.push(' Family')
    if (value.includes(14)) result.push(' Fantasy')
    if (value.includes(36)) result.push(' History')
    if (value.includes(27)) result.push(' Horror')
    if (value.includes(10402)) result.push(' Music')
    if (value.includes(9648)) result.push(' Mystery')
    if (value.includes(878)) result.push(' Science Fiction')
    if (value.includes(10770)) result.push(' TV Movie')
    if (value.includes(53)) result.push(' Thriller')
    if (value.includes(10752)) result.push(' War')
    if (value.includes(36)) result.push(' History')
    if (value.includes(37)) result.push(' Western')

    console.log(value, ' -> ', result)
    return result
  }

}