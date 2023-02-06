import {Component, Input} from '@angular/core';
import {IGenre} from "../../interfaces/global";

@Component({
  selector: 'app-genre-feature-a',
  templateUrl: './genre-feature-a.component.html',
  styleUrls: ['./genre-feature-a.component.scss']
})
export class GenreFeatureAComponent {
  @Input() genre: IGenre
}
