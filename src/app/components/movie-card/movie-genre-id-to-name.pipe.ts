import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'movieGenreIdToName'
})
export class MovieGenreIdToNamePipe implements PipeTransform {
  transform(value: number[], ...args: number[]): string[] {
    let result = []
    if (value.includes(28)) result.push('Action')
    if (value.includes(12)) result.push('Adventure')
    if (value.includes(16)) result.push('Animation')
    if (value.includes(35)) result.push('Comedy')
    if (value.includes(80)) result.push('Crime')
    if (value.includes(99)) result.push('Documentary')
    if (value.includes(18)) result.push('Drama')
    if (value.includes(10751)) result.push('Family')
    if (value.includes(14)) result.push('Fantasy')
    if (value.includes(36)) result.push('History')
    if (value.includes(27)) result.push('Horror')
    if (value.includes(10402)) result.push('Music')
    if (value.includes(9648)) result.push('Mystery')
    if (value.includes(878)) result.push('Science Fiction')
    if (value.includes(10770)) result.push('TV Movie')
    if (value.includes(53)) result.push('Thriller')
    if (value.includes(10752)) result.push('War')
    if (value.includes(37)) result.push('Western')
    if (value.includes(10749)) result.push('Romance')
    if (value.includes(10759)) result.push('Action&Adventure')
    if (value.includes(10762)) result.push('Kids')
    if (value.includes(10763)) result.push('News')
    if (value.includes(10764)) result.push('Reality')
    if (value.includes(10765)) result.push('Sci-fi&Fantasy')
    if (value.includes(10766)) result.push('Soap')
    if (value.includes(10767)) result.push('Talk')
    if (value.includes(10768)) result.push('War&Politics')

    // transform Array of number into Array of strings for rendering
    //console.log(value, ' -> MovieGenreIdToNamePipe -> ', result) // [28, 14, 10770] ' -> MovieGenreIdToNamePipe -> ' (3)['Action', 'Fantasy', 'TV Movie']
    return result.join(', ').split(' , ')
  }
}
