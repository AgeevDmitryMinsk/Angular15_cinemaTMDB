import {Component, HostListener} from '@angular/core';
import {IMovieDetails, IMovieVideosResults} from "../../../interfaces/global";
import {Subscription} from "rxjs";
import {base_image_URL, base_image_URL1920, DataService} from "../../../services/data.service";
import {ActivatedRoute} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ToastrService} from "ngx-toastr";

let apiLoaded = false;
@Component({
  selector: 'app-card-detailed-f',
  templateUrl: './card-detailed-f.component.html',
  styleUrls: ['./card-detailed-f.component.scss']
})
export class CardDetailedFComponent {
  screenHeight: number;
  screenWidth: number;
  cardDetailMovieID: number
  movieDetails: IMovieDetails
  base_image_URL: string = base_image_URL
  base_image_URL1920: string = base_image_URL1920
  imageBackGroundCard: string
  imageCardPoster: string
  movieTrailer: IMovieVideosResults[] | null
  movieTrailerKeyInCard: string | null
  showTrailer: boolean = false
  movieDirector: string
  movieScreenplay: string
  movieStory: string
  movieWriter: string
  cast: any
  movieExternalImdb_id: string
  movieExternalFacebook_id: string
  movieExternalInstagram_id: string
  movieExternalTwitter_id: string
  private routeSubscription: Subscription;


  constructor(
    public dataService: DataService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {
    this.routeSubscription = route.params.subscribe(params => this.cardDetailMovieID = Number(params['id'].split('-')[0]));
    // check data
    //console.log(35, `this.cardDetailMovieID =`, this.cardDetailMovieID)
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    // check data
    //console.log('Высота экрана:', this.screenHeight, 'Ширина экрана:', this.screenWidth);
  }

  ngOnInit(): void {
    this.dataService.getMovieDetails(this.cardDetailMovieID).subscribe((result) => {
      // check data
      // console.log(JSON.stringify(result))
      this.movieDetails = result.movieDetailsFromDataService
      // check data
      //console.log('this.movieDetails in TestCardDetailedComponent = ', this.movieDetails)
      this.imageBackGroundCard = this.base_image_URL1920 + this.movieDetails.backdrop_path;
      this.imageCardPoster = this.base_image_URL + this.movieDetails.poster_path
      this.showSuccessToastr(`Movie details are loaded from back`)
      this.showSuccessToastr(`You chose: ${this.movieDetails.title}`)
    })
    this.dataService.getMovieTrailer(this.cardDetailMovieID).subscribe((result) => {
      this.movieTrailer = result.movieTrailerFromDataService
      // check data
      // console.log('this.movieTrailer in TestCardDetailedComponent = ', this.movieTrailer)
      if (!this.movieTrailer) {
        this.showErrorToastr('Trailers not found')
        console.log(`Trailers not found!!!`)
      } else {
        this.showSuccessToastr('Trailer found')
      }
      this.movieTrailerKeyInCard = result.movieTrailerKeyFromDataService
      // check data
      //console.log('this.movieTrailerKeyInCard in TestCardDetailedComponent = ', this.movieTrailerKeyInCard)
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
    this.dataService.getMovieDirector(this.cardDetailMovieID).subscribe(resultt => {
      this.movieDirector = resultt.Director
      // check data
      //console.log(this.movieDirector)
    })
    this.dataService.getMovieCastAndCrew(this.cardDetailMovieID).subscribe(resultt => {
      this.movieDirector = resultt.Director
      // check data
      //console.log(this.movieDirector)
      this.movieScreenplay = resultt.Screenplay
      this.movieStory = resultt.Story
      this.movieWriter = resultt.Writer
      this.cast = resultt.Cast
      // check data
      //console.log(`this.cast in TestCardDetailedComponent = `, this.cast)
      //this.imageTopActors[0] = this.base_image_URL1920 + resultt;
    })

    this.dataService.getMovieExternalSourcesDetails(this.cardDetailMovieID).subscribe(result => {
      [this.movieExternalImdb_id,
        this.movieExternalFacebook_id,
        this.movieExternalInstagram_id,
        this.movieExternalTwitter_id ] = [
        result.movieExternalImdb_id,
        result.movieExternalFacebook_id,
        result.movieExternalInstagram_id,
        result.movieExternalTwitter_id
      ]
    })

    //reload a page once using localStorage for rendering popover invisible elements in TestCardDetailedComponent
    if (!localStorage.getItem('rendering_popover')) {
      localStorage.setItem('rendering_popover', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('rendering_popover')
    }
  }

  showSuccessToastr(message: string) { // toastr для параллельного отображения сообщений в углу экрана
    this.toastr.success(message, '(Message from ToastrService)', {
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
    });
  }

  showErrorToastr(message: string) { // toastr для параллельного отображения сообщений в углу экрана
    this.toastr.error(message, '(Message from ToastrService)', {
      timeOut: 6000,
      positionClass: 'toast-bottom-right',
    });
  }

  playTrailer() {
    console.log('playTrayler ', this.cardDetailMovieID)
    this.dataService.getMovieTrailer(this.cardDetailMovieID)
    this.showTrailer = true
    this.openSnackBar('playTraylerMessage', 'openSnackBar')
    this.showSuccessToastr(`${this.movieDetails.title} Play Trailer Button clicked`)
  }

  closeTrailer() {
    this.showTrailer = false
    this.showSuccessToastr(`${this.movieDetails.title} closed`)
  }

  onPlayerReady($event: YT.PlayerEvent) {
    console.log('onPlayerReady clicked')
    this.openSnackBar('onPlayerReady', 'openSnackBar')
    this.showSuccessToastr(`${this.movieDetails.title} reade to play`)
    $event.target.playVideo()
  }

  onApiChange($event: YT.PlayerEvent) {
    console.log('onApiChange clicked', $event)
    this.openSnackBar('onApiChangeMessage', 'openSnackBar')
    this.showSuccessToastr(`${this.movieDetails.title} API changed`)
  }

  onErrorYoutube($event: YT.OnErrorEvent) {
    // check data
    //console.log('onErrorYoutube some error:', $event)
    this.openSnackBar('onErrorYoutubeMessage', 'openSnackBar')
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10_000,
      horizontalPosition: "right",
      verticalPosition: "top"
    });
  }

  //link to external resource of selected film (facebook, instagram, twitter, homeFilmPage)
  goToLink(url: string) {
    window.open(url, "_blank");
  }
}
