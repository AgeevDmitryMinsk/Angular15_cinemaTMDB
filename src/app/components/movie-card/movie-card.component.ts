import {Component, Input} from '@angular/core';
import {IMovieResults} from "../../interfaces/global";
import {base_image_URL, DataService} from "../../services/data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() movie: IMovieResults
  base_image_URL: string = base_image_URL;

  MovieDirectorName: string

  constructor(
    public dataService: DataService,
    public router: Router,
  ) {
  }

  //получаю имя режиссера фильма (но только для movie, т.к. у tv нет такого свойства в объекте и падает ошибка):
  // ngOnInit() {
  //   this.dataService.getMovieDirector(this.movie.id).subscribe((result)=>{
  //     console.log(36, JSON.stringify(result))
  //     this.MovieDirectorName = result.Director
  //   })
  // }


  getDetailedMovieTvCard(idCard:number, titleCard: string) {
    console.log("You click at card with ID:", idCard)
    ///превращаю idCard и titleCard в строку через дефис типа: 211239-the-love-in-your-eyes
    let cardName= `${idCard}-${titleCard.toLowerCase().trim().replace(/[^a-z ]/g, '').split(' ').join('-')}`
    this.dataService.clickedMovieId = idCard
    this.router.navigate(
      ["movie" , cardName],
      {
        state: {id: '990909090', name: "что-то другое"},

      }
    )
  }
}
