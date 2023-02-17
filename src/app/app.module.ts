import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ResultsComponent} from './components/results/results.component';
import {AngularSvgIconModule} from "angular-svg-icon";
import {DataService} from "./services/data.service";
import {ParamInterceptor} from "./interceptors/param.interceptor";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import { MovieGenreIdToNamePipe } from './components/movie-card/movie-genre-id-to-name.pipe';
import { GenreComponent } from './components/genre/genre.component';
import { TestCardDetailedComponent } from './components/test-card-detailed/test-card-detailed.component';
import { CardDetailStringPipe } from './components/test-card-detailed/card-detail-string.pipe';
import { MinutesToHHMMPipe } from './components/test-card-detailed/minutes-to-hh-mm.pipe';
import { VoteToPercentPipe } from './components/test-card-detailed/vote-to-percent.pipe';
import {NgCircleProgressModule} from "ng-circle-progress";
import {YouTubePlayerModule} from "@angular/youtube-player";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../material/material.module";
import {MatNativeDateModule} from "@angular/material/core";
import {ToastrModule} from "ngx-toastr";
import {MatButtonModule} from "@angular/material/button";
import { TopBilledCastCardComponent } from './components/top-billed-cast-card/top-billed-cast-card.component';
import {CustomerFeatureAModule} from "./customer-feature-a/customer-feature-a.module";


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movie-results/:id', component: ResultsComponent, data: {id: '1', name: "Angular"}},
  {path: 'tv-results/:id', component: ResultsComponent, data: {id: '1', name: "Angular"}},
  {path: 'movie/:id', component: TestCardDetailedComponent, data: {id: '1', name: "Angular"}},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ResultsComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    MovieCardComponent,
    MovieGenreIdToNamePipe,
    GenreComponent,
    TestCardDetailedComponent,
    CardDetailStringPipe,
    MinutesToHHMMPipe,
    VoteToPercentPipe,
    TopBilledCastCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularSvgIconModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatCardModule,
    MatGridListModule,
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
    YouTubePlayerModule,
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    CustomerFeatureAModule
  ],
  providers: [
    DataService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
