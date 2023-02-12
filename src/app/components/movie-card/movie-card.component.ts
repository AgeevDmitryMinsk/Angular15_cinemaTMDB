import {Component, Input} from '@angular/core';
import {IMovieResults} from "../../interfaces/global";
import {base_image_URL} from "../../services/data.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: IMovieResults
  base_image_URL: string = base_image_URL;
}
