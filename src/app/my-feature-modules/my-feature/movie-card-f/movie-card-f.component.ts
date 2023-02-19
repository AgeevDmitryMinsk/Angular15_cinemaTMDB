import {Component, Input} from '@angular/core';
import { base_image_URL } from 'src/app/services/data.service';
import {IMovieResults} from "../../../interfaces/global";

@Component({
  selector: 'app-movie-card-f',
  templateUrl: './movie-card-f.component.html',
  styleUrls: ['./movie-card-f.component.scss']
})
export class MovieCardFComponent {
  @Input() movie: IMovieResults
  base_image_URL: string = base_image_URL;
}
