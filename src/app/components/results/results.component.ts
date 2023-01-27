import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, Subscription, takeUntil} from "rxjs";

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
        this.page = queryParam['page']
        console.log('this.page =', this.page)
        this.allClickedMovies = this.dataService.movie; // добавил для привязки получение данных к чендж роута и профит.
        console.log(39, 'this.allClickedMovies in resultComponent = ', this.allClickedMovies) // correct movie or tv
      }
    );
    this.queryState = route.data.subscribe((queryParam: any) => {
      this.name = queryParam['name']
      console.log('this.name =', this.name)
    })
  }


  public ngOnInit(): void {
    this.allClickedMovies = this.dataService.movie;
    console.log(51, 'this.allClickedMovies in resultComponent = ', this.allClickedMovies) // correct movie or tv
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy)) // так как это "горячий" наблюдаемый, от него необходимо отписываться, иначе может быть "утечка" памяти
      .subscribe((data) => {
        console.log('activatedRoute.data  from ResultsComponent', data)
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  loadMore(){
    this.dataService.page++
    console.log('loadMore button clicked', 'And this.dataService.page = ', this.dataService.page)
    this.dataService.getMovie('', this.clickedGenreID, this.movie_tv).subscribe(responz=>{
      console.log('responz in resultComponent' , responz)
      this.allClickedMovies = [...this.allClickedMovies, ...responz.response.results]
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
