import {Component, HostListener, Input} from '@angular/core';
import {base_image_URL} from 'src/app/services/data.service';
import {IMovieCastPeopleCredits} from "../../../interfaces/global";

@Component({
  selector: 'app-known-for-movies',
  templateUrl: './known-for-movies.component.html',
  styleUrls: ['./known-for-movies.component.scss']
})
export class KnownForMoviesComponent {
  screenHeight: number
  screenWidth: number
  @Input() castDetails: IMovieCastPeopleCredits

  constructor() {
    this.getScreenSize()
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;

    //check data
    console.log('Высота экрана KnownForMoviesComponent:', this.screenHeight, 'Ширина экрана:', this.screenWidth);
  }
  base_image_URL: string = base_image_URL;
}
