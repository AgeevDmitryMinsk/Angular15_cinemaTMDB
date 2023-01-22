import {Component, Input} from '@angular/core';
import {IMovieResults} from "../../interfaces/global";
import {base_image_URL, DataService} from "../../services/data.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: IMovieResults
  base_image_URL: string = base_image_URL;

  MovieDirectorName: string

  constructor(
    public dataService: DataService,
  ) {
  }

  //получаю имя режиссера фильма:
  ngOnInit() {
    this.dataService.getMovieDirector(this.movie.id).subscribe((result)=>{
      console.log(36, JSON.stringify(result))
      this.MovieDirectorName = result.Director
    })
  }


}
