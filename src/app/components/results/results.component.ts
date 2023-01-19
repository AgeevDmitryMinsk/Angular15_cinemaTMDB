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



}
