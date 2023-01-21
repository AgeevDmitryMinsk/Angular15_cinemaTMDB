import {Component, Input} from '@angular/core';
import {IMovieResults} from "../../interfaces/global";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: IMovieResults
}
