import {Component, Input} from '@angular/core';
import {IMovieCastPeople} from "../../interfaces/global";
import {base_image_URL} from "../../services/data.service";

@Component({
  selector: 'app-top-billed-cast-card',
  templateUrl: './top-billed-cast-card.component.html',
  styleUrls: ['./top-billed-cast-card.component.scss']
})
export class TopBilledCastCardComponent {
  @Input() castActor: IMovieCastPeople

  base_image_URL: string = base_image_URL;

}
