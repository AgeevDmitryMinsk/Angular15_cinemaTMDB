import {Component, Input} from '@angular/core';
import {IGenre} from "../../interfaces/global";

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent {

  @Input() genre: IGenre
}
