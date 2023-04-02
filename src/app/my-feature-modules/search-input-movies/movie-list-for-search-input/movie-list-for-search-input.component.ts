import {Component, Input, OnInit} from '@angular/core';
import {base_image_URL, DataService} from 'src/app/services/data.service';
import {IMovieResults} from "../../../interfaces/global";

@Component({
  selector: 'app-movie-list-for-search-input',
  templateUrl: './movie-list-for-search-input.component.html',
  styleUrls: ['./movie-list-for-search-input.component.scss']
})
export class MovieListForSearchInputComponent implements OnInit {
  @Input() searchInputMovies: IMovieResults
  insideIndex: number
  imageCardPoster: string
  base_image_URL: string = base_image_URL

  constructor(
    public dataService: DataService,
  ) {
    };
  ngOnInit(): void {
    this.imageCardPoster = this.base_image_URL + this.searchInputMovies.poster_path
    if (  this.searchInputMovies.poster_path  && this.searchInputMovies.name) {
      this.insideIndex = this.dataService.insideIndex
      this.dataService.insideIndex++
    }

    console.log("ngOnInit in MovieListForSearchInputComponent")
    // throw new Error('Method not implemented.');
  }
}
