import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IGenres} from "../../app.component";

export const API_KEY: string = "261986cbb51c934516a9889245136067";

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

  constructor(
    private http: HttpClient
  ) {
  }

  getGenresMovieData(): Observable<IGenres> {
    return this.http.get<IGenres>(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=ru-RU`)
  }

  getGenresTV_Data(): Observable<IGenres> {
    return this.http.get<IGenres>(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=ru-RU`)
  }


}


