import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {ResultsComponent} from './components/results/results.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import {DataService} from "./services/data.service";
import {ParamInterceptor} from "./interceptors/param.interceptor";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home/home.component';


const appRoutes: Routes =[
  {path: '',  component: HomeComponent},
  {path: 'movie-results',  component: ResultsComponent},
  // {path: '**',  component: NotFoundComponent},

]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ResultsComponent,
    NotFoundComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularSvgIconModule.forRoot(),
    RouterModule.forRoot(appRoutes)
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
