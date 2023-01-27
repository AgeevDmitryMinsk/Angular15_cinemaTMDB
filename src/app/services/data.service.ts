import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AsyncSubject, BehaviorSubject, map, Observable, Subject} from "rxjs";
import {IGenres, IMovieCrewPeople, IMoviePeople, IMoviesAllData} from "../interfaces/global";

// export const API_KEY: string = ""; перенес в interceptor
export const base_URL: string = "https://api.themoviedb.org/3";
export const base_image_URL : string = "https://image.tmdb.org/t/p/w500"

export const base_director_URL : string = "https://api.themoviedb.org/3/movie"


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
  page: number=1;
  movieDirector: string
  DirectorArr: IMovieCrewPeople[]
  Director:string


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


  getMovie(event_genre: string, event_genre_id: number, movie_tv: string ) {
    console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id)
    return this.movieData = this.http.get<IMoviesAllData>(`${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}&page=${this.page}`)
      .pipe(map((data) => {
        console.log(data, `${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}`)
        console.log('data.page in dataServise = ', data.page)
        return {
          url: `${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}`,
          // page: data.page,
          page: this.page,
          response: data
        };
      }));
  }

  //метод для получения имени режиссера в компоненте MovieCardComponent
  getMovieDirector(movieID: number) {
    return this.http.get<IMoviePeople>(`${base_URL}/movie/${movieID}/credits`)
      .pipe(map(response => {
        this.DirectorArr = response.crew.filter(({job})=> job ==='Director')
        console.log( this.DirectorArr[0])
         this.Director = this.DirectorArr[0].name
        console.log(this.Director)
        return {
          Director: this.Director
        }
      }))

  }

  myData: number = 1;

  //тренировал Observable)))
  searsh$ = new Observable(observer=> {
    console.log('start in Observable')
    observer.next(1);
    observer.next(2);
    observer.next(3);
    console.log('end in Observable')
  })
}


