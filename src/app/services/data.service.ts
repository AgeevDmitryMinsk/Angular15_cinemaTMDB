import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {IGenres, IMoviesAllData} from "../interfaces/global";

// export const API_KEY: string = ""; перенес в interceptor
export const base_URL: string = "https://api.themoviedb.org/3";



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

  clickedGenre: string = ''
  clickedGenreMovie_TV: string = ''
  clickedGenreID?: number
  my_request = ''
  moviesRequest: string;

  movieData: any
  movie: any;


  constructor(
    private http: HttpClient
  ) {
  }

  getGenresMovieData(): Observable<IGenres> {
    // return this.http.get<IGenres>(`${base_URL}/genre/movie/list?api_key=${API_KEY}&language=ru-RU`)
    return this.http.get<IGenres>(`${base_URL}/genre/movie/list`)
  }

  getGenresTV_Data(): Observable<IGenres> {
    // return this.http.get<IGenres>(`${base_URL}/genre/tv/list?api_key=${API_KEY}&language=ru-RU`)
    return this.http.get<IGenres>(`${base_URL}/genre/tv/list`)
  }


  getMovie(event_genre: string, event_genre_id: number, movie_tv: string) {
    console.log("click =", event_genre, ',', movie_tv, ',', event_genre_id)
    return this.movieData = this.http.get<IMoviesAllData>(`${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}`).pipe(map((data) => {
      return {url: `${base_URL}/discover/${movie_tv}?with_genres=${event_genre_id}`, response: data};
    }));
  }

}


