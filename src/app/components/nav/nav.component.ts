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

  clickedGenre: string = ''
  clickedGenreID?: number

  clickedGenreMovie_TV: string = ''
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
          // console.log(JSON.stringify(result))
          this.genres = result.genres
          this.showSuccessToastr('Movie-genres are loaded from back')
        },
        error: (e) => {
          console.log("ОШИБКА:", e.message)
          this.openSnackBar(e.message)
          this.showErrorToastr(e.message)
        },
        complete: () => console.log('done')
      })

    this.dataService.getGenresTV_Data()
      .subscribe({
        next: (result) => {
          this.genresTV = result.genres
          this.showSuccessToastr('TV-genres are loaded from backend')
        },
        error: (e) => {
          console.log("ОШИБКА:", e.message)
          this.openSnackBar(e.message)
          this.showErrorToastr(e.message)
        },
        complete: () => console.log('done2')
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
      this.movie = response.response;
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
