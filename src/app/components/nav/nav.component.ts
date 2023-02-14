import {Component} from '@angular/core';
import {IGenre} from "../../interfaces/global";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  moviesRequest: string;

  genres: IGenre[]
  genresTV: IGenre[]
  movie: any;
  page: number;

  constructor(
    public dataService: DataService,
    public router: Router,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {
  }


  ngOnInit() {
    this.dataService.getGenresMovieData()
      .subscribe({
        next: (result) => {
          //get genres from backend
          //console.log(' JSON.stringify getGenresMovieData = ',JSON.stringify(result)) // {"genres":[{"id":28,"name":"Action"},{"id":12,"name":"Adventure"},{"id":16,"name":"Animation"},{"id":35,"name":"Comedy"},{"id":80,"name":"Crime"},{"id":99,"name":"Documentary"},{"id":18,"name":"Drama"},{"id":10751,"name":"Family"},{"id":14,"name":"Fantasy"},{"id":36,"name":"History"},{"id":27,"name":"Horror"},{"id":10402,"name":"Music"},{"id":9648,"name":"Mystery"},{"id":10749,"name":"Romance"},{"id":878,"name":"Science Fiction"},{"id":10770,"name":"TV Movie"},{"id":53,"name":"Thriller"},{"id":10752,"name":"War"},{"id":37,"name":"Western"}]}
          this.genres = result.genres
          this.showSuccessToastr('Movie-genres are loaded from back')
        },
        error: (e) => {
          console.log("ERROR in getGenresMovieData:", e.message)
          this.openSnackBar(e.message)
          this.showErrorToastr(e.message)
        },
        complete: () => {
          //inform that getGenresMovieData completed
          //console.log('getGenresMovieData done')
        }
      })

    this.dataService.getGenresTV_Data()
      .subscribe({
        next: (result) => {
          this.genresTV = result.genres
          this.showSuccessToastr('TV-genres are loaded from backend')
        },
        error: (e) => {
          console.log("ERROR in getGenresTV_Data:", e.message)
          this.openSnackBar(e.message)
          this.showErrorToastr(e.message)
        },
        complete: () => {
          //inform that getGenresTV_Data completed
          //console.log('getGenresTV_Data done')
        }
      })
  }

  getMovie(event_genre: string, event_genre_id: number, movie_tv: string) {
    //check "click =", event_genre, ',', movie_tv, ',', event_genre_id
    //console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id);
    this.dataService.getMovie('', event_genre_id, movie_tv).subscribe(response => {
      // check response.url -> https://api.themoviedb.org/3/discover/movie?with_genres=28
      //console.log(response.url)
      this.moviesRequest = `${response.url}&api_key=${environment.API_KEY}`;
      this.dataService.moviesRequest = this.moviesRequest
      this.page = response.page
      this.dataService.page = this.page
      //check page
      //console.log(this.page) // 1
      //check dataService.moviesRequest ->  'https://api.themoviedb.org/3/discover/movie?with_genres=28&api_key=261986cbb51c934516a9889245136067'
      //console.log(this.dataService.moviesRequest)
      this.movie = response.response;
      this.dataService.movie = this.movie;

      //check this.movie // ->
      //  (20) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      // {adult: false, backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg', genre_ids: Array(3), id: 505642, original_language: 'en', …}
      // {adult: false, backdrop_path: '/9Rq14Eyrf7Tu1xk0Pl7VcNbNh1n.jpg', genre_ids: Array(3), id: 646389, original_language: 'en', …}
      // {adult: false, backdrop_path: '/tGwO4xcBjhXC0p5qlkw37TrH6S6.jpg', genre_ids: Array(5), id: 315162, original_language: 'en', …}
      // console.log(55, this.movie)

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

  openSnackBar(message: string) { // openSnackBar для последовательного отображения сообщений в углу экрана
    this._snackBar.open(message, '_snackBar ERROR: try to use VPN ', {
      duration: 3000,
      horizontalPosition: "left",
      verticalPosition: "top",
    });
  }

  showErrorToastr(message: string) { // toastr для параллельного отображения сообщений в углу экрана
    this.toastr.error(message, 'Try to use VPN if you are in BELARUS (Toastr ERROR)', {
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    });
  }

  showSuccessToastr(message: string) { // toastr для параллельного отображения сообщений в углу экрана
    this.toastr.success(message, '(Message from ToastrService)', {
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    });
  }

}
