import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { ResultsComponent } from './components/results/results.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import {DataService} from "./services/data.service";
import {ParamInterceptor} from "./interceptors/param.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularSvgIconModule.forRoot()
  ],
  providers:  [
    DataService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
