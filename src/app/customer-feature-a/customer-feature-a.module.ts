import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularSvgIconModule} from "angular-svg-icon";
import { GenreFeatureAComponent } from './genre-feature-a/genre-feature-a.component';



@NgModule({
  declarations: [
    GenreFeatureAComponent
  ],
  exports: [
    GenreFeatureAComponent
  ],
  imports: [
    CommonModule,
    AngularSvgIconModule,
  ]
})
export class CustomerFeatureAModule { }
