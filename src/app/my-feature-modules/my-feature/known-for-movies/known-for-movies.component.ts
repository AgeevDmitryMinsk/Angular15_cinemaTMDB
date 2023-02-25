import {Component, Input} from '@angular/core';
import {base_image_URL} from 'src/app/services/data.service';
import {IMovieCastPeopleCredits} from "../../../interfaces/global";

@Component({
  selector: 'app-known-for-movies',
  templateUrl: './known-for-movies.component.html',
  styleUrls: ['./known-for-movies.component.scss']
})
export class KnownForMoviesComponent {

  @Input() castDetails: IMovieCastPeopleCredits

  base_image_URL: string = base_image_URL;
}
