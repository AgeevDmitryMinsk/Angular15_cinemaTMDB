import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {API_KEY, DataService} from "./components/services/data.service";

export interface IGenre {
  id: number,
  name: string
}

export interface IGenres {
  genres: IGenre[]

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  movies: any[] = [];

  allGenres$: Observable<IGenres>

  genres: IGenre[]
  genresTV: IGenre[]

  clickedGenre: string = ''
  clickedGenreMovie_TV: string = ''
  clickedGenreID?: number

  movie_tv: string
  request = {
    // fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&language=ru-RU`,
    fetchActionMovies: `/discover/${this.clickedGenreMovie_TV}?api_key=${API_KEY}&with_genres=${this.clickedGenreID}&language=ru-RU`,
  }
  constructor(
    private http: HttpClient,
    private dataService: DataService
  ) {
  }


  ngOnInit() {
    this.dataService.getGenresMovieData().subscribe((result) => {
      console.log(JSON.stringify(result))
      this.genres = result.genres
    })

    this.dataService.getGenresTV_Data().subscribe(result => {
      this.genresTV = result.genres
    })
  }

  clickedHandle(event_genre: string, event_genre_id: number, movie_tv: string) {
    console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id)
    this.clickedGenre = event_genre
    this.clickedGenreID = event_genre_id
    this.clickedGenreMovie_TV = movie_tv
  }

}
