import {Component} from '@angular/core';
import {base_image_URL, DataService} from "../../services/data.service";
import {IMovieDetails} from "../../interfaces/global";

@Component({
  selector: 'app-test-card-detailed',
  templateUrl: './test-card-detailed.component.html',
  styleUrls: ['./test-card-detailed.component.scss']
})
export class TestCardDetailedComponent {

  cardDetailMovieID: number
  movieDetails: IMovieDetails
  base_image_URL: string = base_image_URL
  imageBackGroundCard: string
  imageCardPoster: string


  constructor(
    public dataService: DataService){
    this.dataService.movieID.subscribe((result) => {

      // console.log('result in TestCardDetailedComponent = ', result )
      this.cardDetailMovieID = result
    })
  }

  ngOnInit(): void {
    this.dataService.getMovieDetails(this.cardDetailMovieID).subscribe((result) => {
      // console.log(JSON.stringify(result))
      this.movieDetails = result.movieDetailsFromDataService
      console.log('this.movieDetails in TestCardDetailedComponent = ', this.movieDetails)
      this.imageBackGroundCard = this.base_image_URL + this.movieDetails.backdrop_path;
      this.imageCardPoster = this.base_image_URL + this.movieDetails.poster_path
    })
      }



}
