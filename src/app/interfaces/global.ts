export interface IGenre {
  id: number,
  name: string
}

export interface IGenres {
  genres: IGenre[]
}

export interface IConfigurationLanguages {
  iso_639_1: string
  english_name: string
  name: string
}

export interface IMoviesAllData {
  page: number
  results: IMovieResults[]
}

export interface IMovieResults {
  adult: boolean,
  original_title: string,
  release_date: string,
  title: string,
  video: boolean,
  backdrop_path: string,
  first_air_date: string,
  genre_ids: number[],
  id: number,
  name: string,
  origin_country: string[],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number,
}


export interface IMovieCrewPeople {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  credit_id: string,
  department: string,
  job: string,
}

export interface IMovieCastPeople {
  adult: boolean,
  gender: number,
  id: number,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number,
}

export interface IMoviePeople {
  cast: IMovieCastPeople[],
  crew: IMovieCrewPeople[]
}

export interface IMoviePeopleCredits {
  cast: IMovieCastPeopleCredits[],
  crew: IMovieCrewPeopleCredits[],
  id: number
}

export interface IMovieDetails {
  adult: boolean,
  backdrop_path: string,
  belongs_to_collection: { id: number, name: string, poster_path: string, backdrop_path: string }
  budget: number,
  genres: { id: number, name: string }[]
  homepage: string
  id: number,
  imdb_id: string,
  original_language: string,
  original_title: string,
  overview: string
  popularity: number,
  poster_path: string
  production_companies: { id: number, logo_path: string, name: string, origin_country: string }[]
  production_countries: { iso_3166_1: string, name: string }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: { english_name: string, iso_639_1: string, name: string }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface IMovieVideosResults {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: boolean,
  published_at: string,
  id: string,
}

export interface IMovieCastPeopleCredits {
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
  character: string,
  credit_id: string,
  order: number,
}

export interface IMovieCrewPeopleCredits {
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
  credit_id: string,
  department: string,
  job: string,
}

export interface IMovieVideos {
  id: number,
  results: IMovieVideosResults[]
}

export interface IMovieExternalSourcesDetails {
  imdb_id: string,
  facebook_id: string,
  instagram_id: string,
  twitter_id: string,
  id: number
}

export interface IPersonDetails {
  adult?: boolean
  also_known_as?: string[]
  biography: string
  birthday?: string
  deathday?: string
  gender?: number
  homepage?: string
  id: number
  imdb_id?: string
  known_for_department?: string
  name: string
  place_of_birth?: string
  popularity?: number
  profile_path?: string
}

export interface IPersonDetailsExternal_ids {
  facebook_id?: string
  freebase_id?: string
  freebase_mid?: string
  id: number
  imdb_id?: string
  instagram_id?: string
  tvrage_id?: number
  twitter_id?: string
  wikidata_id?: string
}

export interface ILanguageString {
  navigation: INavigationLanguage
  movieCardF: ImovieCardFLanguage
  movieCardDetailedF: IcardDetailPageLanguage
  home: IHomePageLanguage

}

export interface INavigationLanguage {
  home: string,
  language: string,
  movie: string,
  tv: string
}

export interface ImovieCardFLanguage {
  genre: string
  overview: string
  user_score: string
  dont_have_an_overview : string
}

export interface IcardDetailPageLanguage {
  user: string
  score: string
  rating: string
  overview: string
  play_trailer: string
  no_trailers : string
  director:string
  screenplay:string
  story :string
  writer:string
  topBilledCast : string
  you_can_visit_this_movie_here: string
  no_extra_page :string
  visit_movie_at_Facebook_right : string
  visit_movie_at_Twitter_right : string
  visit_movie_at_Instagram_right : string
  visit_movie_homepage_right : string
}

export interface IHomePageLanguage {
  welcome: string
  millions_of_films: string
  find_film_series_persona: string
  search: string
}

export enum numberToGenre {
  Action = 28,
  Adventure = 12,
  Animation = 16,
  Comedy = 35,
  Crime = 80,
  Documentary = 99,
  Drama = 18,
  Family = 10751,
  Fantasy = 14,
  History = 36,
  Horror = 27,
  Music = 10402,
  Mystery = 9648,
  Romance = 10749,
  Science_Fiction = 878,
  TV_Movie = 10770,
  Thriller = 53,
  War = 10752,
  Western = 37
}
