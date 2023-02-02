import {Component} from '@angular/core';
import {base_image_URL, base_image_URL1920, DataService} from "../../services/data.service";
import {IMovieDetails, IMovieVideosResults} from "../../interfaces/global";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from '@angular/material/snack-bar';

let apiLoaded = false;

@Component({
  selector: 'app-test-card-detailed',
  templateUrl: './test-card-detailed.component.html',
  styleUrls: ['./test-card-detailed.component.scss']
})
export class TestCardDetailedComponent {

  cardDetailMovieID: number
  movieDetails: IMovieDetails
  base_image_URL: string = base_image_URL

  base_image_URL1920: string = base_image_URL1920
  imageBackGroundCard: string
  imageCardPoster: string
  movieTrailer: IMovieVideosResults[] | null
  movieTrailerKeyInCard: string | null
  safeURL: string
  showTrailer: boolean = false

  private routeSubscription: Subscription;


  constructor(
    public dataService: DataService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {
    this.routeSubscription = route.params.subscribe(params => this.cardDetailMovieID = Number(params['id'].split('-')[0]));
    console.log(35, `this.cardDetailMovieID =`, this.cardDetailMovieID)
    // this.dataService.movieID.subscribe((result) => {
    //   console.log(37, 'result in TestCardDetailedComponent = ', result)
    //   this.cardDetailMovieID = result
    // })
  }

  ngOnInit(): void {
    this.dataService.getMovieDetails(this.cardDetailMovieID).subscribe((result) => {
      // console.log(JSON.stringify(result))
      this.movieDetails = result.movieDetailsFromDataService
      console.log('this.movieDetails in TestCardDetailedComponent = ', this.movieDetails)
      this.imageBackGroundCard = this.base_image_URL1920 + this.movieDetails.backdrop_path;
      this.imageCardPoster = this.base_image_URL + this.movieDetails.poster_path
    })
    this.dataService.getMovieTrailer(this.cardDetailMovieID).subscribe((result) => {
      this.movieTrailer = result.movieTrailerFromDataService
      console.log('this.movieTrailer in TestCardDetailedComponent = ', this.movieTrailer)
      this.movieTrailerKeyInCard = result.movieTrailerKeyFromDataService
      console.log('this.movieTrailerKeyInCard in TestCardDetailedComponent = ', this.movieTrailerKeyInCard)
      // this.safeURL = `https://www.youtube.com/watch?v` +  this.movieTrailerKeyInCard
      // console.log('this.safeURL = ', this.safeURL)
    })

    if (!apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }

  }


  playTrailer() {
    console.log('playTrayler ', this.cardDetailMovieID)
    this.dataService.getMovieTrailer(this.cardDetailMovieID)
    this.showTrailer = true

    this.openSnackBar('playTraylerMessage', 'Action')
  }

  closeTrailer() {
    this.showTrailer = false
  }

  onPlayerReady($event: YT.PlayerEvent) {
    console.log('onPlayerReady clicked')
    this.openSnackBar('onPlayerReady', 'Action')
    $event.target.playVideo()
  }

  onApiChange($event: YT.PlayerEvent) {
    console.log('onApiChange clicked', $event)
    this.openSnackBar('onApiChangeMessage', 'Action')
  }

  onErrorYoutube($event: YT.OnErrorEvent) {
    console.log('onErrorYoutube some error:', $event)
    this.openSnackBar('onErrorYoutubeMessage', 'Action')
  }

  // openSnackBar(message: string, action: string) {
  //   this._snackBar.open(message, action);
  // }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

}
