import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {
  IGenres, IMovieCastPeople,
  IMovieCrewPeople,
  IMovieDetails, IMovieExternalSourcesDetails,
  IMoviePeople,
  IMovieResults,
  IMoviesAllData,
  IMovieVideos,
  IMovieVideosResults
} from "../interfaces/global";

// export const API_KEY: string = ""; перенес в interceptor
export const base_URL: string = "https://api.themoviedb.org/3";
export const base_image_URL: string = "https://image.tmdb.org/t/p/w500"
export const base_image_URL1920: string = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces"

export const base_director_URL: string = "https://api.themoviedb.org/3/movie"


@Injectable({
  providedIn: 'root'
})


export class DataService {

  // 28 Action
  // 12 Adventure
  // 16 Animation
  // 35 Comedy
  // 80 Crime
  // 99 Documentary
  // 18 Drama
  // 10751 Family
  // 14 Fantasy
  // 36 History
  // 27 Horror
  // 10402 Music
  // 9648 Mystery
  // 10749 Romance
  // 878 Science Fiction
  // 10770 TV Movie
  // 53 Thriller
  // 10752 War
  // 37 Western
  // 10759 Action & Adventure
  // 10762 Kids
  // 10763 News
  //  10764 Reality
  // 10765 Sci-fi & Fantasy
  //  10766 Soap
  //  10767 Talk
  //  10768 War & Politics


  clickedGenre: string = ''
  clickedGenreMovie_TV: string = ''
  clickedGenreID?: number
  my_request = ''
  moviesRequest: string;

  movieData: any
  movie: any;
  page: number = 1;
  movieDirector: string
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


  constructor(
    private http: HttpClient
  ) {
  }

  getGenresMovieData(): Observable<IGenres> { // Observable - конструктор источника событий
    // return this.http.get<IGenres>(`${base_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`)
    return this.http.get<IGenres>(`${base_URL}/genre/movie/list`)
  }

  getGenresTV_Data(): Observable<IGenres> {
    // return this.http.get<IGenres>(`${base_URL}/genre/tv/list?api_key=${API_KEY}&language=ru-RU`)
    return this.http.get<IGenres>(`${base_URL}/genre/tv/list`)
  }

  movieID = new BehaviorSubject<number>(0);


  getMovie(event_genre: string, event_genre_id: number, movie_tv: string) {
    console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id)
    return this.movieData = this.http.get<IMoviesAllData>(`${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}&page=${this.page}`)
      .pipe(map((data) => {
        console.log(data, `${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}`)
        console.log('data.page in dataServise = ', data.page)
        console.log(`this.allClickedMovies in DataService = `, this.allClickedMovies)
        return {
          url: `${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}`,
          // page: data.page,
          page: this.page,
          response: [...this.allClickedMovies, ...data.results]
        };
      }));
  }

  //метод для получения имени режиссера в компоненте MovieCardComponent
  getMovieDirector(movieID: number) {
    return this.http.get<IMoviePeople>(`${base_URL}/movie/${movieID}/credits`)
      .pipe(map(response => {
        console.log(`response in getMovieDirector`, response)
        this.DirectorArr = response.crew.filter(({job}) => job === 'Director')
        console.log(this.DirectorArr[0])
        this.Director = this.DirectorArr[0].name
        console.log(this.Director)
        return {
          Director: this.Director
        }
      }))
  }

  //метод для получения актерского состава и команды работников съемки (режиссера, постановщик, продюсеры) в компоненте MovieCardComponent
  getMovieCastAndCrew(movieID: number) {
    return this.http.get<IMoviePeople>(`${base_URL}/movie/${movieID}/credits`)
      .pipe(map(response => {
        console.log(`!!!!!!! response in getMovieCastAndCrew`, response)
        this.DirectorArr = response.crew.filter(({job}) => job === 'Director')
        this.ScreenplayArr = response.crew.filter(({job}) => job === 'Screenplay')
        this.StoryArr = response.crew.filter(({job}) => job === 'Story')
        this.WriterArr = response.crew.filter(({job}) => job === 'Writer')
        console.log(this.DirectorArr[0])
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
        console.log('Director = ', this.Director, ` Screenplay = `, this.Screenplay, ' Story =', this.Story)
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

  getMovieDetails(movieID: number) {
    return this.http.get<IMovieDetails>(`${base_URL}/movie/${movieID}`)
      .pipe(map(responsse => {
        console.log(responsse)
        this.movieDetails = responsse
        return {
          movieDetailsFromDataService: this.movieDetails
        }
      }))
  }

  getMovieExternalSourcesDetails(movieID: number) {
    return this.http.get<IMovieExternalSourcesDetails>(`${base_URL}/movie/${movieID}/external_ids`)
      .pipe(map(response => {
        console.log("_ _ _responsse in getMovieExternalSourcesDetails = ", response)
        this.movieExternalSourcesDetails = response
        return {
          movieExternalSourcesDetailsFromDataService: this.movieExternalSourcesDetails
        }
      }))
  }

  getMovieTrailer(movieID: number) {
    return this.http.get<IMovieVideos>(`${base_URL}/movie/${movieID}/videos`)
      .pipe(map(videoResponse => {
        if (videoResponse.results.length > 0) {
          console.log(`videoResponse.results in DataService = `, videoResponse.results)

          // this.movieTrailer = videoResponse.results.filter(({name}) => name.includes(`Trailer`))
          this.movieTrailer = videoResponse.results.filter(({name}) => name.includes(``))

          console.log(`videoResponse.results in DataService after filter= `, this.movieTrailer)
          this.movieTrailerKey = this.movieTrailer[0].key
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

  myData: number = 1;


  //тренировал Observable)))
  searsh$ = new Observable(observer => {
    console.log('start in Observable')
    observer.next(1);
    observer.next(2);
    observer.next(3);
    console.log('end in Observable')
  })
}


