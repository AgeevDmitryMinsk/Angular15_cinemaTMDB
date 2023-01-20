import { Component } from '@angular/core';
import {IGenre} from "../../interfaces/global";
import {DataService} from "../../services/data.service";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  moviesRequest: string;

  genres: IGenre[]
  genresTV: IGenre[]

  clickedGenre: string = ''
  clickedGenreID?: number

  clickedGenreMovie_TV: string = ''
  movie: any;

  constructor(
    public dataService: DataService,
    public router: Router,
  ) {
  }


  ngOnInit() {
    // this.router.navigate(['movie-results'], {state: {id: '990909090', name: "что-то другое"}})
    this.dataService.getGenresMovieData().subscribe((result) => {
      // console.log(JSON.stringify(result))
      this.genres = result.genres
    })
    this.dataService.getGenresTV_Data().subscribe(result => {
      this.genresTV = result.genres
    })
  }

  getMovie(event_genre: string, event_genre_id: number, movie_tv: string) {
    console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id);
    this.clickedGenre = event_genre;
    this.clickedGenreID = event_genre_id;
    this.clickedGenreMovie_TV = movie_tv;
    this.dataService.getMovie('', event_genre_id, movie_tv).subscribe(response => {
      console.log(response.url)
      this.moviesRequest = `${response.url}&api_key=${environment.API_KEY}`;
      this.dataService.moviesRequest = this.moviesRequest
      this.movie = response.response.results;
      console.log(this.movie)
    })
    this.dataService.myData = 3
    this.dataService.clickedGenreMovie_TV = movie_tv
    this.dataService.clickedGenre = event_genre
    this.dataService.clickedGenreID = event_genre_id
    // this.router.navigate(['movie-results'], {state: {id: '990909090', name: "что-то другое"}})
    // this.router.navigate(['movie-results', event_genre_id], { state:{ id:'1', name:"Angular"}})
    this.router.navigate([movie_tv ==='movie'?'movie-results':'tv-results', event_genre], { state:{ id:'1', name:"Angular"}})

  }

  showMenu = false;
  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }
}