import {Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DataService} from "../../services/data.service";
import {IGenre} from "../../interfaces/global";
import {ActivatedRoute} from "@angular/router";
import {Subject, takeUntil} from "rxjs";

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
  constructor(
    public dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {
    this.activatedRoute.data
      .pipe(takeUntil(this.destroy)) // так как это "горячий" наблюдаемый, от него необходимо отписываться, иначе может быть "утечка" памяти
      .subscribe((data) => {
      console.log('activatedRoute.data ResultsComponent', data)
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

}
