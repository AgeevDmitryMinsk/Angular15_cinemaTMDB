import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {IGenre} from "./interfaces/global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  moviesRequest: string;

  genres: IGenre[]
  genresTV: IGenre[]

  clickedGenre: string = ''
    clickedGenreID?: number

  clickedGenreMovie_TV: string = ''

  constructor(
    public dataService: DataService,

  ) {
  }


  ngOnInit() {
    this.dataService.getGenresMovieData().subscribe((result) => {
      // console.log(JSON.stringify(result))
      this.genres = result.genres
    })
    this.dataService.getGenresTV_Data().subscribe(result => {
      this.genresTV = result.genres
    })
    this.clickedGenreMovie_TV =  this.dataService.clickedGenreMovie_TV
  }

}
