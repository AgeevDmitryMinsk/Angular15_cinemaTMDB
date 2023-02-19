import {Component, Input} from '@angular/core';
import { base_image_URL } from 'src/app/services/data.service';
import {IMovieCastPeople} from "../../../interfaces/global";

@Component({
  selector: 'app-top-billed-cast-card-f',
  templateUrl: './top-billed-cast-card-f.component.html',
  styleUrls: ['./top-billed-cast-card-f.component.scss']
})
export class TopBilledCastCardFComponent {
  @Input() castActor: IMovieCastPeople

  base_image_URL: string = base_image_URL;
}
