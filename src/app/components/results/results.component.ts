import {Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IGenre} from "../../interfaces/global";
import {ActivatedRoute} from "@angular/router";
import {Subject, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy{
  genres: IGenre[]
  genresTV: IGenre[]

  clickedGenreMovie_TV: string = ''
  clickedGenre: string = ''
  clickedGenreID?: number
  moviesRequest: string;

  private destroy: Subject<boolean> = new Subject<boolean>();

  id: number | undefined;
  constructor(
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
  private route: ActivatedRoute,
  private activateRoute: ActivatedRoute){
    this.id = activateRoute.snapshot.params['id'];

  }



  // constructor(private route: ActivatedRoute) { }
  //
  // ngOnInit(): void {
  //   this.productSubscribtion = this.route.data.subscribe((data) => {
  //     this.product = data['data'];
  //   });
  // }



  // constructor(private route: ActivatedRoute){}
  // ngOnInit() {
  //   this.route.paramMap.pipe(
  //     switchMap(params => params.getAll('id'))
  //   )
  //     .subscribe(data=> this.id = +data);
  // }

  public ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy)) // так как это "горячий" наблюдаемый, от него необходимо отписываться, иначе может быть "утечка" памяти
      .subscribe((data) => {
      console.log('activatedRoute.data  from ResultsComponent', data)
    });
    this.route.paramMap.pipe(
      switchMap(params => params.getAll('id'))
    )
      .subscribe(data=> this.id = +data);
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
