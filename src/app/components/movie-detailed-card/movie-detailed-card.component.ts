import {Component} from '@angular/core';
import {IMovieResults} from "../../interfaces/global";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-movie-detailed-card',
  templateUrl: './movie-detailed-card.component.html',
  styleUrls: ['./movie-detailed-card.component.scss']
})
export class MovieDetailedCardComponent {
  movieDetail: IMovieResults
  cardId: number

  constructor(
    public dataService: DataService,
  ) {
    this.cardId = dataService.clickedMovieId
  }
}
