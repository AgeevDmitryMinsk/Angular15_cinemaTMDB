import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_KEY, base_URL, DataService} from "./components/services/data.service";
import {IGenre, IMoviesAllData} from "./interfaces/global";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  moviesRequest: string;

  movieData: any
  movie: any;

  genres: IGenre[]
  genresTV: IGenre[]

  clickedGenre: string = ''
  clickedGenreMovie_TV: string = ''
  clickedGenreID?: number
  my_request = ''

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
    // this.my_request = `/discover/${this.clickedGenreMovie_TV}?api_key=${API_KEY}&with_genres=${this.clickedGenreID}&language=ru-RU` // => будет отображение фильмов на русском)
    this.my_request = `/discover/${this.clickedGenreMovie_TV}?api_key=${API_KEY}&with_genres=${this.clickedGenreID}`
    this.moviesRequest = `${base_URL}${this.my_request}`
    // console.log(this.moviesRequest)
    this.movieData = this.http.get<IMoviesAllData>(this.moviesRequest).subscribe(response=>{
      this.movie = response.results
      console.log(this.movie)
    })
  }

}
