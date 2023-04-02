import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {
  IConfigurationLanguages,
  IGenres,
  IMovieCastPeople,
  IMovieCrewPeople,
  IMovieDetails,
  IMovieExternalSourcesDetails,
  IMoviePeople,
  IMoviePeopleCredits,
  IMovieResults,
  IMoviesAllData,
  IMovieVideos,
  IMovieVideosResults,
  IPersonDetails,
  IPersonDetailsExternal_ids
} from "../interfaces/global";
import {DE} from "../strings/DE/de-string";
import {ENG} from "../strings/ENG/eng-string";
import {FR} from "../strings/FR/fr-string";
import {PL} from "../strings/PL/pl-string";
import {RU} from "../strings/RU/ru-string";
import {UKR} from "../strings/UK/ukr-string";
import {BLR} from "../strings/BLR/blr-string";
import {JA} from "../strings/JA/jpn-string";

// export const API_KEY: string = ""; перенес в interceptor
export const base_URL: string = "https://api.themoviedb.org/3";
export const base_image_URL: string = "https://image.tmdb.org/t/p/w500"
export const base_image_URL1920: string = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"

@Injectable({
  providedIn: 'root'
})

export class DataService {
  clickedGenre: string = ''
  clickedGenreMovie_TV: string = ''
  clickedGenreID?: number
  moviesRequest: string;
  movieData: any
  movie: any;
  page: number = 1;
  DirectorArr: IMovieCrewPeople[]
  ScreenplayArr: IMovieCrewPeople[]
  StoryArr: IMovieCrewPeople[]
  WriterArr: IMovieCrewPeople[]
  cast: IMovieCastPeople[]
  Director: string
  Screenplay: string
  Story: string
  Writer: string
  movieDetails: IMovieDetails
  movieTrailer: IMovieVideosResults[] | null
  movieTrailerKey: string | null
  allClickedMovies: IMovieResults[] = []
  movieExternalSourcesDetails: IMovieExternalSourcesDetails
  actorDetails: IPersonDetails
  actorDetailsKnownFor: IMoviePeopleCredits
  actorDetailsExternal_ids: IPersonDetailsExternal_ids

  insideIndex: number = 1

  constructor(
    private http: HttpClient
  ) {
  }

  getGenresMovieData(): Observable<IGenres> { // Observable - конструктор источника событий
    //remove API_KEY into interceptor
    // return this.http.get<IGenres>(`${base_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`)
    // return this.http.get<IGenres>(`${base_URL}/genre/movie/list?language=ru`)
    return this.http.get<IGenres>(`${base_URL}/genre/movie/list`)
  }

  getGenresTV_Data(): Observable<IGenres> {
    //remove API_KEY into interceptor
    // return this.http.get<IGenres>(`${base_URL}/genre/tv/list?api_key=${API_KEY}&language=ru-RU`)
    return this.http.get<IGenres>(`${base_URL}/genre/tv/list`)
  }

  getConfigurationLanguage(): Observable<IConfigurationLanguages[]> {
    return this.http.get<IConfigurationLanguages[]>(`${base_URL}/configuration/languages`)
  }

  movieID = new BehaviorSubject({value_ID: 0});
  actorID = new BehaviorSubject<number>(0);
  languageSelected = new BehaviorSubject({language: 'en'})

  getMovie(event_genre: string, event_genre_id: number, movie_tv: string): Observable<any> {
    // check data
    //console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id)
    return this.movieData = this.http.get<IMoviesAllData>(`${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}&page=${this.page}`)
      .pipe(map((data) => {
        // check data
        // console.log(data, `${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}`)
        // console.log('data.page in dataServise = ', data.page)
        // console.log(`this.allClickedMovies in DataService = `, this.allClickedMovies)
        return {
          url: `${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}`,
          // page: data.page,
          page: this.page,
          response: [...this.allClickedMovies, ...data.results]
        };
      }));
  }

  getSearch(text:string):Observable<any>{
    return this.http.get<IMoviesAllData>(`${base_URL}/search/multi?query=${text}&page=${this.page}`)
      .pipe(map((data) => {
        // check data
        console.log("data in getSearch = ", data)
        // console.log('data.page in dataServise = ', data.page)
        // console.log(`this.allClickedMovies in DataService = `, this.allClickedMovies)
        return {
          page: this.page,
          // response: [...this.allClickedMovies, ...data.results]
          response: data.results
        };
      }))
  }

  //method to get the name of the director in the component MovieCardComponent
  getMovieDirector(movieID: number) {
    return this.http.get<IMoviePeople>(`${base_URL}/movie/${movieID}/credits`)
      .pipe(map(response => {
        //console.log(`response in getMovieDirector`, response)
        this.DirectorArr = response.crew.filter(({job}) => job === 'Director')
        //console.log(this.DirectorArr[0])
        if (this.DirectorArr[0]) {
          this.Director = this.DirectorArr[0].name
        }
        //console.log(this.Director)
        return {
          Director: this.Director
        }
      }))
  }

  //method for obtaining a cast and crew of production workers (director, director, producers) in the component MovieCardComponent
  getMovieCastAndCrew(movieID: number) {
    return this.http.get<IMoviePeople>(`${base_URL}/movie/${movieID}/credits`)
      .pipe(map(response => {
        //console.log(`!!!!!!! response in getMovieCastAndCrew`, response)
        this.DirectorArr = response.crew.filter(({job}) => job === 'Director')
        this.ScreenplayArr = response.crew.filter(({job}) => job === 'Screenplay')
        this.StoryArr = response.crew.filter(({job}) => job === 'Story')
        this.WriterArr = response.crew.filter(({job}) => job === 'Writer')
        //console.log(this.DirectorArr[0])
        if (this.DirectorArr[0]) {
          this.Director = this.DirectorArr[0].name
        }
        if (this.ScreenplayArr[0]) {
          this.Screenplay = this.ScreenplayArr[0].name
        }
        if (this.StoryArr[0]) {
          this.Story = this.StoryArr[0].name
        }
        if (this.Screenplay === this.Story) {
          if (this.ScreenplayArr[1]) {
            this.Screenplay = this.ScreenplayArr[1].name
          }
        }
        if (this.WriterArr[0]) {
          this.Writer = this.WriterArr[0].name
        }
        //console.log('Director = ', this.Director, ` Screenplay = `, this.Screenplay, ' Story =', this.Story)
        this.cast = response.cast

        return {
          Director: this.Director,
          Screenplay: this.Screenplay,
          Story: this.Story,
          Writer: this.Writer,
          Cast: this.cast
        }
      }))
  }

  getActorDetails(actorID: number) {
    //console.log('getActorDetails ***', actorID)
    return this.http.get<IPersonDetails>(`${base_URL}/person/${actorID}`)
      .pipe(map(responsse => {
        console.log("getActorDetails response", responsse)
        this.actorDetails = responsse
        return {
          actorDetailsFromDataService: this.actorDetails
        }
      }))
  }

  getActorDetailsKnownFor(actorID: number) {
    return this.http.get<IMoviePeopleCredits>(`${base_URL}/person/${actorID}/movie_credits`)
      .pipe(map(responz => {
        console.log("getActorDetailsKnownFor responz", responz)
        this.actorDetailsKnownFor = responz
        return {
          actorDetailsKnownForFromDataService: this.actorDetailsKnownFor
        }
      }))
  }

  getActorDetailsExternal_ids(actorID: number) {
    return this.http.get<IPersonDetailsExternal_ids>(`${base_URL}/person/${actorID}/external_ids`)
      .pipe(map(responzs => {
        console.log("getActorDetailsExternal_ids responzs", responzs)
        this.actorDetailsExternal_ids = responzs
        return {
          actorDetailsExternal_idsFromDataService: this.actorDetailsExternal_ids
        }
      }))
  }


  getMovieDetails(movieID: number):Observable<any> {
    return this.http.get<IMovieDetails>(`${base_URL}/movie/${movieID}`)
      .pipe(map(responsse => {
        // console.log(responsse)
        this.movieDetails = responsse
        return {
          movieDetailsFromDataService: this.movieDetails
        }
      }))
  }

  getMovieExternalSourcesDetails(movieID: number) {
    return this.http.get<IMovieExternalSourcesDetails>(`${base_URL}/movie/${movieID}/external_ids`)
      .pipe(map(response => {
        // console.log("_ _ _responsse in getMovieExternalSourcesDetails = ", response)
        this.movieExternalSourcesDetails = response
        return {
          movieExternalSourcesDetailsFromDataService: this.movieExternalSourcesDetails,
          movieExternalImdb_id: this.movieExternalSourcesDetails.imdb_id,
          movieExternalFacebook_id: this.movieExternalSourcesDetails.facebook_id,
          movieExternalInstagram_id: this.movieExternalSourcesDetails.instagram_id,
          movieExternalTwitter_id: this.movieExternalSourcesDetails.twitter_id,
        }
      }))
  }

  getMovieTrailer(movieID: number) {
    return this.http.get<IMovieVideos>(`${base_URL}/movie/${movieID}/videos`)
      .pipe(map(videoResponse => {
        if (videoResponse.results.length > 0) {
          console.log(`videoResponse.results in DataService = `, videoResponse.results)

          this.movieTrailer = videoResponse.results.filter(({name}) => name.includes(``))

          //Checking to see if there is an official trailer
          if (videoResponse.results.filter(({name}) => name.includes(`Trailer`))) {
            console.log("YES Trailer exist")
            this.movieTrailer = videoResponse.results.filter(({name}) => name.includes(`Trailer`)
                || name.includes(`трейлер`)
                || name.includes(`annonce`)
            )
            if(this.movieTrailer.length === 0) {
              this.movieTrailer = videoResponse.results.filter(({name}) => name.length>0 )
            }
            console.log("this.movieTrailer after filtering = ", this.movieTrailer)

          }

          console.log(`videoResponse.results in DataService after filter= `, this.movieTrailer)
          if (this.movieTrailer[0]) {
            this.movieTrailerKey = this.movieTrailer[0].key
          }
          console.log(`this.movieTrailerKey in DataService =`, this.movieTrailerKey)
        } else {
          this.movieTrailer = null
          this.movieTrailerKey = null
        }

        return {
          movieTrailerFromDataService: this.movieTrailer,
          movieTrailerKeyFromDataService: this.movieTrailerKey
        }
      }))
  }

  getLanguage(languageInLocalStorage: string,
              propertyLang: string,
              ) {
    let PageString: any
      //INavigationLanguage | ImovieCardFLanguage | IcardDetailPageLanguage
    switch (languageInLocalStorage) {
      case "de":
        PageString = propertyLang === "navigation" ?  DE.navigation :
                     propertyLang === "movieCardF" ?  DE.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  DE.movieCardDetailedF : DE.home
        break;
      case "en":
        PageString = propertyLang === "navigation" ?  ENG.navigation :
                     propertyLang === "movieCardF" ?  ENG.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  ENG.movieCardDetailedF : ENG.home
        break;
      case "fr":
        PageString = propertyLang === "navigation" ?  FR.navigation :
                     propertyLang === "movieCardF" ?  FR.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  FR.movieCardDetailedF : FR.home
        break;
      case "pl":
        PageString = propertyLang === "navigation" ?  PL.navigation :
                     propertyLang === "movieCardF" ?  PL.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  PL.movieCardDetailedF : PL.home
        break;
      case "ru":
        PageString = propertyLang === "navigation" ?  RU.navigation :
                     propertyLang === "movieCardF" ?  RU.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  RU.movieCardDetailedF : RU.home
        break;
      case "uk":
        PageString = propertyLang === "navigation" ?  UKR.navigation :
                     propertyLang === "movieCardF" ?  UKR.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  UKR.movieCardDetailedF : UKR.home
        break;
      case "be":
        PageString = propertyLang === "navigation" ?  BLR.navigation :
                     propertyLang === "movieCardF" ?  BLR.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  BLR.movieCardDetailedF : BLR.home
        break;
      case "ja":
        PageString = propertyLang === "navigation" ?  JA.navigation :
                     propertyLang === "movieCardF" ?  JA.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  JA.movieCardDetailedF : JA.home
        break;
      default:
        PageString = propertyLang === "navigation" ?  ENG.navigation :
                     propertyLang === "movieCardF" ?  ENG.movieCardF :
                     propertyLang === "movieCardDetailedF" ?  ENG.movieCardDetailedF : ENG.home
    }
    //console.log("~~~~~~~~~~~navPageStringFromComponent in getLanguage = ", PageString)
    //navPageStringFromComponent = PageString

    return PageString

  }

  myData: number = 1;

  //train Observable)))
  // searsh$ = new Observable(observer => {
  //   // console.log('start in Observable')
  //   // observer.next(1);
  //   // observer.next(2);
  //   observer.next(3);
  //   // console.log('end in Observable')
  // })

  searsh$ = new BehaviorSubject(3)
}
