import {Component, Input} from '@angular/core';
import {IGenre} from "../../app.component";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  @Input() genre: IGenre



}
