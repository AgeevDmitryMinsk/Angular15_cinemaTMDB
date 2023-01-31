import {Component} from '@angular/core';
import {IGenre} from "../../interfaces/global";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  moviesRequest: string;

  genres: IGenre[]
  genresTV: IGenre[]

  clickedGenre: string = ''
  clickedGenreID?: number

  clickedGenreMovie_TV: string = ''
  movie: any;
  page: number;

  constructor(
    public dataService: DataService,
    public router: Router,
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

  }

  getMovie(event_genre: string, event_genre_id: number, movie_tv: string) {
    console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id);
    this.dataService.getMovie('', event_genre_id, movie_tv).subscribe(response => {
      console.log(response.url)
      this.moviesRequest = `${response.url}&api_key=${environment.API_KEY}`;
      this.dataService.moviesRequest = this.moviesRequest
      this.page = response.page
      this.dataService.page = this.page
      console.log(51, this.page)
      console.log(52, this.dataService.moviesRequest)
      this.movie = response.response.results;
      this.dataService.movie = this.movie;
      console.log(55, this.movie)

      this.router.navigate(
        [movie_tv === 'movie' ? 'movie-results' : 'tv-results', event_genre],
        {
          state: {id: '990909090', name: "что-то другое"},
          queryParams: {
            'movie_tv': movie_tv, 'clickedGenreID': event_genre_id, 'page': 1, 'event_genre': event_genre
          }
        }
      )
    })
    this.dataService.myData = 3 // for test transfer data in dataService
    this.dataService.clickedGenreMovie_TV = movie_tv
    this.dataService.clickedGenre = event_genre
    this.dataService.clickedGenreID = event_genre_id
  }
}
