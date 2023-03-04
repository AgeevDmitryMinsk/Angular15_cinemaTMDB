import {Component, OnDestroy, OnInit} from '@angular/core';
import {IMovieResults} from "../../../interfaces/global";
import {Subject, Subscription, takeUntil} from "rxjs";
import {DataService} from "../../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {environment} from "../../../../environments/environment";
import {HttpErrorResponse} from "@angular/common/http";
import {Utils} from "../../../components/Utils/utils";

@Component({
  selector: 'app-results-f',
  templateUrl: './results-f.component.html',
  styleUrls: ['./results-f.component.scss']
})
export class ResultsFComponent implements OnInit, OnDestroy  {
  clickedGenreID: number
  movie_tv: string;
  page: number
  name: string
  allClickedMovies: IMovieResults[];
  i: number;
  movieName: string
  moviesRequest: string;
  movie: any;
  event_genre:string
  private destroy: Subject<boolean> = new Subject<boolean>();
  id: number | undefined;
  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  private queryState: Subscription;
  constructor(
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    public router: Router ,
    private toastr: ToastrService) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.movie_tv = queryParam['movie_tv'];
        // check data
        //console.log("movie_tv=", this.movie_tv)
        this.clickedGenreID = queryParam['clickedGenreID'];
        //console.log('this.clickedGenreID=', this.clickedGenreID)
        this.dataService.page = queryParam['page']
        //console.log('this.page =', this.page)
        this.event_genre = queryParam['event_genre']
        //console.log(46, 'this.event_genre =', this.event_genre)
        this.dataService.getMovie('', this.clickedGenreID,  this.movie_tv).subscribe({
          next: response => {
            //if (this.movie_tv === undefined || this.clickedGenreID || this.dataService.page === undefined) this.router.navigate(['**'] )
            // check data
            //console.log(49, response.url)
            this.moviesRequest = `${response.url}&api_key=${environment.API_KEY}`;
            this.dataService.moviesRequest = this.moviesRequest
            this.page = response.page
            this.dataService.page = this.page
            // check data
            // console.log(54, this.page)
            // console.log(55, this.dataService.moviesRequest)
            this.movie = response.response;
            this.dataService.movie = this.movie;
            //console.log(58, this.movie)
            this.allClickedMovies = this.dataService.movie; // добавил для привязки получение данных к чендж роута и профит.
            //console.log(66, '******* this.allClickedMovies in resultComponent = ', this.allClickedMovies) // correct movie or tv
          },
          error: (e: HttpErrorResponse)=> {
            // check data
            //console.log("ERROR-message  in results getMovie", e.message)
            //console.log("ERROR-name in results getMovie", e.name)
            //console.log("ERROR-status in results getMovie", e.status)
            if (e.status === 404) {
              this.showErrorToastr('server cannot find the requested resource')
            }
            this.router.navigate(['PageNotFound'] )
          }
        })
      }
    );
    this.queryState = route.data.subscribe((queryParam: any) => {
      this.name = queryParam['name']
      // check data
      //console.log('this.name =', this.name)
    })
  }
  public ngOnInit(): void {
    // check data
    // this.allClickedMovies = this.dataService.movie;
    // console.log('this.allClickedMovies in resultComponent = ', this.allClickedMovies) // correct movie or tv
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy)) // так как это "горячий" наблюдаемый, от него необходимо отписываться, иначе может быть "утечка" памяти
      .subscribe((data) => {
        // check data
        // console.log(86, 'activatedRoute.data  from ResultsComponent', data) // {id: '1', name: 'Angular'}
      });
  }
  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  loadMore(){
    this.dataService.page++
    // check data
    //console.log(85, 'loadMore button clicked', 'And this.dataService.page = ', this.dataService.page)
    //console.log(93, ' in loadMore ')
    this.dataService.getMovie('', this.clickedGenreID, this.movie_tv).subscribe(responz=>{
      // check data
      //console.log('responz in resultComponent' , responz)
      // this.allClickedMovies = [...this.allClickedMovies, ...responz.response]
      this.dataService.allClickedMovies = this.allClickedMovies
      this.router.navigate(
        [this.movie_tv === 'movie' ? 'movie-results' : 'tv-results', this.event_genre],
        {
          state: {id: '990909090', name: "что-то другое"},
          queryParams: {
            'movie_tv':this.movie_tv, 'clickedGenreID': this.clickedGenreID, 'page': this.dataService.page, 'event_genre': this.event_genre
          }
        }
      )
    })
  }

  getDetailedCard(movieId: number, ind:number) {
    // check data
    //console.log('getDetailedCard movieId in ResultsComponent =', movieId )
    //console.log('ind in ResultsComponent =', ind )
    //console.log('this.allClickedMovies in ResultsComponent =', this.allClickedMovies[ind].title, this.allClickedMovies[ind].name )
    this.dataService.movieID.next(movieId) // кладу в переменную movieID новое значение movieId и потом отслеживаю его через this.dataService.movieID.subscribe в TestCardDetailedComponent
    this.movieName = this.allClickedMovies[ind].title || this.allClickedMovies[ind].name
    // this.movieName = `${movieId}-${this.movieName.toLowerCase().replace(/[^\w\s\']|_/g, '').trim().split(' ').join('-')}`
    this.movieName = `${movieId}-${new Utils(this.movieName).urlTransformName()}`
    console.log("this.movieName in ResultsFComponent: ", this.movieName)
    this.router.navigate(
      ['movie', this.movieName],
      {
        state: {id: '990909090', name: "что-то другое"},
        queryParams: {
        }
      }
    )
  }

  showErrorToastr(message: string) { // toastr для параллельного отображения сообщений в углу экрана
    this.toastr.error(message, '(Toastr ERROR: page not found)', {
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    });
  }
}
