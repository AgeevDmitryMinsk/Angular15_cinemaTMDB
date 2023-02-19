import {Component, Input} from '@angular/core';
import {IGenre} from "../../../interfaces/global";

@Component({
  selector: 'app-genre-f',
  templateUrl: './genre-f.component.html',
  styleUrls: ['./genre-f.component.scss']
})
export class GenreFComponent {
  @Input() genre: IGenre
}
