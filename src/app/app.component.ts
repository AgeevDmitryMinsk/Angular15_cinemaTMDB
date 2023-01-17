import {Component, OnInit} from '@angular/core';
import {DataService} from "./services/data.service";
import {IGenre} from "./interfaces/global";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  moviesRequest: string;

  genres: IGenre[]
  genresTV: IGenre[]

  clickedGenre: string = ''
  clickedGenreID?: number

  clickedGenreMovie_TV: string = ''
  movie: any;

  constructor(
    public dataService: DataService,
  ) {
  }


  ngOnInit() {
    this.dataService.getGenresMovieData().subscribe((result) => {
      // console.log(JSON.stringify(result))
      this.genres = result.genres
    })
    this.dataService.getGenresTV_Data().subscribe(result => {
      this.genresTV = result.genres
    })
    this.clickedGenreMovie_TV = this.dataService.clickedGenreMovie_TV
  }

  getMovie(event_genre: string, event_genre_id: number, movie_tv: string) {
    console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id);
    this.clickedGenre = event_genre;
    this.clickedGenreID = event_genre_id;
    this.clickedGenreMovie_TV = movie_tv;
    this.dataService.getMovie('', event_genre_id, movie_tv).subscribe(response => {
      console.log(response.url)
      this.moviesRequest = `${response.url}&api_key=${environment.API_KEY}`;
      this.movie = response.response.results;
      console.log(this.movie)
    })
  }
}
