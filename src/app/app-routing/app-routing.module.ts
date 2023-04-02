import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "../components/home/home/home.component";
import {ResultsFComponent} from "../my-feature-modules/my-feature/results-f/results-f.component";
import {CardDetailedFComponent} from "../my-feature-modules/my-feature/card-detailed-f/card-detailed-f.component";
import {PersonDetailedFComponent} from "../my-feature-modules/my-feature/person-detailed-f/person-detailed-f.component";
import {NotFoundComponent} from "../components/not-found/not-found.component";
import {SearchInputMoviesComponent} from "../my-feature-modules/search-input-movies/search-input-movies.component";

export const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movie-results/:id', component: ResultsFComponent, data: {id: '1', name: "Angular"}},
  {path: 'tv-results/:id', component: ResultsFComponent, data: {id: '1', name: "Angular"}},
  {path: 'movie/:id', component: CardDetailedFComponent, data: {id: '1', name: "Angular"}},
  {path: 'person/:id', component: PersonDetailedFComponent, data: {id: '1', name: "Angular"}},
  {path: 'search/:id', component: SearchInputMoviesComponent, data: {id: '1', name: "Angular"}},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
