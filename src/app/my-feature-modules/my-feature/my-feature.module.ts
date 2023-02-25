import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreFComponent } from './genre-f/genre-f.component';
import { ResultsFComponent } from './results-f/results-f.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import { MovieCardFComponent } from './movie-card-f/movie-card-f.component';
import {MatCardModule} from "@angular/material/card";
import {MovieFGenreIdToNamePipe} from "./movie-card-f/movieF-genre-id-to-name.pipe";
import { CardDetailedFComponent } from './card-detailed-f/card-detailed-f.component';
import {CardDetailStringPipe} from "./card-detailed-f/card-detailF-string.pipe";
import {MinutesToHHMMPipe} from "./card-detailed-f/minutesF-to-hh-mm.pipe";
import {NgCircleProgressModule} from "ng-circle-progress";
import { TopBilledCastCardFComponent } from './top-billed-cast-card-f/top-billed-cast-card-f.component';
import {YouTubePlayerModule} from "@angular/youtube-player";
import { PersonDetailedFComponent } from './person-detailed-f/person-detailed-f.component';
import { KnownForMoviesComponent } from './known-for-movies/known-for-movies.component';



@NgModule({
  declarations: [
    GenreFComponent,
    ResultsFComponent,
    MovieCardFComponent,
    MovieFGenreIdToNamePipe,
    CardDetailedFComponent,
    CardDetailStringPipe,
    MinutesToHHMMPipe,
    TopBilledCastCardFComponent,
    PersonDetailedFComponent,
    KnownForMoviesComponent
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    MatCardModule,
    NgCircleProgressModule,
    YouTubePlayerModule,
    // NgCircleProgressModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),
  ],
  exports: [
    GenreFComponent,
  ]
})
export class MyFeatureModule { }
