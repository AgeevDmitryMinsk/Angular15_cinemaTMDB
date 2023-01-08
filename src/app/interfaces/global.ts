export interface IGenre {
  id: number,
  name: string
}

export interface IGenres {
  genres: IGenre[]

}

export interface IMoviesAllData {
  page: number
  results: IMovieResults[]
}

export interface IMovieResults {
  adult: boolean,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}
