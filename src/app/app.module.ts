import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {NavComponent} from './components/nav/nav.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AngularSvgIconModule} from "angular-svg-icon";
import {DataService} from "./services/data.service";
import {ParamInterceptor} from "./interceptors/param.interceptor";
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from './components/not-found/not-found.component';
import {HomeComponent} from './components/home/home/home.component';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatInputModule} from "@angular/material/input";
import {MaterialModule} from "../material/material.module";
import {MatNativeDateModule} from "@angular/material/core";
import {ToastrModule} from "ngx-toastr";
import {MatButtonModule} from "@angular/material/button";
import {MyFeatureModule} from "./my-feature-modules/my-feature/my-feature.module";
import {ResultsFComponent} from "./my-feature-modules/my-feature/results-f/results-f.component";
import {CardDetailedFComponent} from "./my-feature-modules/my-feature/card-detailed-f/card-detailed-f.component";


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'movie-results/:id', component: ResultsFComponent, data: {id: '1', name: "Angular"}},
  {path: 'tv-results/:id', component: ResultsFComponent, data: {id: '1', name: "Angular"}},
  {path: 'movie/:id', component: CardDetailedFComponent, data: {id: '1', name: "Angular"}},
  {path: '**', component: NotFoundComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NotFoundComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
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
    MatInputModule,
    ReactiveFormsModule,
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    MyFeatureModule // <- add a function module here
  ],
  providers: [
    DataService, {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    }],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
