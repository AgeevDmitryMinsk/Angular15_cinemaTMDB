import {Component} from '@angular/core';
import {DataService} from 'src/app/services/data.service';
import {IMovieResults} from "../../interfaces/global";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search-input-movies',
  templateUrl: './search-input-movies.component.html',
  styleUrls: ['./search-input-movies.component.scss']
})
export class SearchInputMoviesComponent {
  searchInputMoviesFromRoute: IMovieResults[] = []

  private routeSubscription: Subscription;
  searchFromRoute: string

  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
  ) {
    this.routeSubscription = route.params.subscribe(params => {
      this.searchFromRoute = params['id']
      console.log('this.searchFromRoute = ', this.searchFromRoute)
      console.log('params = ', params)
    });


    console.log('this.searchFromRoute 30 = ', this.searchFromRoute)

  }

  ngOnInit(): void {
    this.funcGetFilmsInsideSearchInputMoviesComponent()
  }

  funcGetFilmsInsideSearchInputMoviesComponent() {
    this.dataService.getSearch(this.searchFromRoute).subscribe((el) => {
      this.searchInputMoviesFromRoute = [...this.searchInputMoviesFromRoute, ...el.response]

      if (this.searchInputMoviesFromRoute.length < 45) {
        this.dataService.page++
        this.funcGetFilmsInsideSearchInputMoviesComponent()
      }
    })
  }
}
