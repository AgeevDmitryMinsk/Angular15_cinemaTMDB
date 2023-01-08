import {Component, Input} from '@angular/core';
import {IGenre} from "../../interfaces/global";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() genre: IGenre
}
