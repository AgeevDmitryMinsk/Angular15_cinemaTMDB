import {Component, SimpleChanges} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IGenre} from "../../interfaces/global";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  genres: IGenre[]
  genresTV: IGenre[]

  clickedGenreMovie_TV: string = ''
  clickedGenre: string = ''
  clickedGenreID?: number
  moviesRequest: string;
  constructor(
    public dataService: DataService,
  ) {
  }

  ngOnInit() {
    this.dataService.getGenresMovieData().subscribe((result) => {
      // console.log(JSON.stringify(result))
      this.genres = result.genres
      console.log(this.genres)
    })
    this.dataService.getGenresTV_Data().subscribe(result => {
      this.genresTV = result.genres

    })
    this.clickedGenreMovie_TV = this.dataService.clickedGenreMovie_TV
    console.log(this.clickedGenreMovie_TV)
    console.log(this.dataService.myData)
  }

  ngOnChanges(obj: SimpleChanges) {
    console.log('OnChanges', obj)
  }

}
