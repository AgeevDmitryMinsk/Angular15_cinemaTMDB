import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {
  IGenres, IMovieCastPeople,
  IMovieCrewPeople,
  IMovieDetails, IMovieExternalSourcesDetails,
  IMoviePeople, IMoviePeopleCredits,
  IMovieResults,
  IMoviesAllData,
  IMovieVideos,
  IMovieVideosResults, IPersonDetails, IPersonDetailsExternal_ids
} from "../interfaces/global";

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

  constructor(
    private http: HttpClient
  ) {
  }

  getGenresMovieData(): Observable<IGenres> { // Observable - конструктор источника событий
    //remove API_KEY into interceptor
    // return this.http.get<IGenres>(`${base_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`)
    return this.http.get<IGenres>(`${base_URL}/genre/movie/list`)
  }

  getGenresTV_Data(): Observable<IGenres> {
    //remove API_KEY into interceptor
    // return this.http.get<IGenres>(`${base_URL}/genre/tv/list?api_key=${API_KEY}&language=ru-RU`)
    return this.http.get<IGenres>(`${base_URL}/genre/tv/list`)
  }

  movieID = new BehaviorSubject<number>(0);
  actorID = new BehaviorSubject<number>(0);

  getMovie(event_genre: string, event_genre_id: number, movie_tv: string) {
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

  //method to get the name of the director in the component MovieCardComponent
  getMovieDirector(movieID: number) {
    return this.http.get<IMoviePeople>(`${base_URL}/movie/${movieID}/credits`)
      .pipe(map(response => {
        //console.log(`response in getMovieDirector`, response)
        this.DirectorArr = response.crew.filter(({job}) => job === 'Director')
        //console.log(this.DirectorArr[0])
        this.Director = this.DirectorArr[0].name
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
        this.Director = this.DirectorArr[0].name
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
         //console.log("getActorDetails response", responsse)
        this.actorDetails = responsse
        return {
          actorDetailsFromDataService: this.actorDetails
        }
      }))
  }

  getActorDetailsKnownFor(actorID: number){
    return this.http.get<IMoviePeopleCredits>(`${base_URL}/person/${actorID}/movie_credits`)
      .pipe(map(responz => {
        // console.log("getActorDetailsKnownFor responz", responz)
        this.actorDetailsKnownFor = responz
        return {
          actorDetailsKnownForFromDataService: this.actorDetailsKnownFor
        }
      }))
  }

  getActorDetailsExternal_ids(actorID: number){
    return this.http.get<IPersonDetailsExternal_ids>(`${base_URL}/person/${actorID}/external_ids`)
      .pipe(map(responzs => {
        console.log("getActorDetailsExternal_ids responzs", responzs)
        this.actorDetailsExternal_ids = responzs
        return {
          actorDetailsExternal_idsFromDataService: this.actorDetailsExternal_ids
        }
      }))
  }


  getMovieDetails(movieID: number) {
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
          //console.log(`videoResponse.results in DataService = `, videoResponse.results)

          this.movieTrailer = videoResponse.results.filter(({name}) => name.includes(``))

          //Checking to see if there is an official trailer
          if (videoResponse.results.filter(({name}) => name.includes(`Trailer`))){
            //console.log("YES Trailer exist")
            this.movieTrailer = videoResponse.results.filter(({name}) => name.includes(`Trailer`))
          }

          //console.log(`videoResponse.results in DataService after filter= `, this.movieTrailer)
          this.movieTrailerKey = this.movieTrailer[0].key
          //console.log(`this.movieTrailerKey in DataService =`, this.movieTrailerKey)
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

  myData: number = 1;

  //train Observable)))
  searsh$ = new Observable(observer => {
    // console.log('start in Observable')
    observer.next(1);
    observer.next(2);
    observer.next(3);
    // console.log('end in Observable')
  })
}


