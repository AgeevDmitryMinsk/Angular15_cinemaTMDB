import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenreFComponent } from './genre-f/genre-f.component';
import { ResultsFComponent } from './results-f/results-f.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import { MovieCardFComponent } from './movie-card-f/movie-card-f.component';
import {MatCardModule} from "@angular/material/card";
import {MovieFGenreIdToNamePipe} from "./movie-card-f/movieF-genre-id-to-name.pipe";



@NgModule({
  declarations: [
    GenreFComponent,
    ResultsFComponent,
    MovieCardFComponent,
    MovieFGenreIdToNamePipe
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule,
    MatCardModule,
  ],
  exports: [
    GenreFComponent,
    ResultsFComponent,
    MovieCardFComponent,
    MovieFGenreIdToNamePipe
  ]
})
export class MyFeatureModule { }
