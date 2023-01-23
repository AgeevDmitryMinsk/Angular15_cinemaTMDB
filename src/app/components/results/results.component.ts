import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {Subject, Subscription, takeUntil} from "rxjs";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  clickedGenreID?: number
  movie_tv: string;
  page: number
  name: string
  allClickedMovies: any;

  private destroy: Subject<boolean> = new Subject<boolean>();

  id: number | undefined;
  private routeSubscription: Subscription;
  private querySubscription: Subscription;
  private queryState: Subscription;

  constructor(
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute) {
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

}
