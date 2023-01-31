import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription, takeUntil} from "rxjs";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  clickedGenreID: number
  movie_tv: string;
  page: number
  name: string
  allClickedMovies: any;
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
    public router: Router  ) {
    this.routeSubscription = route.params.subscribe(params => this.id = params['id']);
    this.querySubscription = route.queryParams.subscribe(
      (queryParam: any) => {
        this.movie_tv = queryParam['movie_tv'];
        console.log("movie_tv=", this.movie_tv)
        this.clickedGenreID = queryParam['clickedGenreID'];
        console.log('this.clickedGenreID=', this.clickedGenreID)
        this.dataService.page = queryParam['page']
        console.log('this.page =', this.page)
        this.event_genre = queryParam['event_genre']
        console.log(46, 'this.event_genre =', this.event_genre)

        this.dataService.getMovie('', this.clickedGenreID,  this.movie_tv).subscribe(response => {
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
          this.allClickedMovies = this.dataService.movie; // добавил для привязки получение данных к чендж роута и профит.
          console.log(42, 'this.allClickedMovies in resultComponent = ', this.allClickedMovies) // correct movie or tv
        })
      }
    );
    this.queryState = route.data.subscribe((queryParam: any) => {
      this.name = queryParam['name']
      console.log('this.name =', this.name)
    })
  }


  public ngOnInit(): void {
    // this.allClickedMovies = this.dataService.movie;
    // console.log(82, 'this.allClickedMovies in resultComponent = ', this.allClickedMovies) // correct movie or tv
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy)) // так как это "горячий" наблюдаемый, от него необходимо отписываться, иначе может быть "утечка" памяти
      .subscribe((data) => {
        console.log(86, 'activatedRoute.data  from ResultsComponent', data) // {id: '1', name: 'Angular'}
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  loadMore(){
    this.dataService.page++
    console.log(85, 'loadMore button clicked', 'And this.dataService.page = ', this.dataService.page)

    console.log(93, ' in loadMore ')


    this.dataService.getMovie('', this.clickedGenreID, this.movie_tv).subscribe(responz=>{
      console.log('responz in resultComponent' , responz)
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
    console.log('getDetailedCard movieId in ResultsComponent =', movieId )
    console.log('ind in ResultsComponent =', ind )
    console.log('this.allClickedMovies in ResultsComponent =', this.allClickedMovies[ind].title, this.allClickedMovies[ind].name )

    this.dataService.movieID.next(movieId) // кладу в переменную movieID новое значение movieId и потом отслеживаю его через this.dataService.movieID.subscribe в TestCardDetailedComponent

    this.movieName = this.allClickedMovies[ind].title || this.allClickedMovies[ind].name
    this.movieName = `${movieId}-${this.movieName.toLowerCase().replace(/[^\w\s\']|_/g, '').trim().split(' ').join('-')}`
    this.router.navigate(
      ['movie', this.movieName],
      {
        state: {id: '990909090', name: "что-то другое"},
        queryParams: {
          // '':  this.movieName.toLowerCase().replace(/[^\w\s\']|_/g, '').trim().split(' ').join('-')
        }
      }
    )
  }
}
