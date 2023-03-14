import {Component, OnInit} from '@angular/core';
import {ENG} from "../../strings/ENG/eng-string";
import {RU} from "../../strings/RU/ru-string";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {DataService} from "../../services/data.service";
import {DE} from "../../strings/DE/de-string";
import {FR} from "../../strings/FR/fr-string";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  languageFromQueryParams: string;

  public navPageString = ENG.navigation;
  //public navPageString = RU.navigation;
  constructor(
    public dataService: DataService
    ){

  }
  public ngOnInit(): void {
    this.dataService.languageSelected.subscribe(
      {
        next: (result) => {
          console.log("languageSelected result in HeaderComponent", result.language)
          this.languageFromQueryParams = result.language
          // this.navPageString = result.language === "en" ? ENG.navigation:RU.navigation;
          // this.navPageString = result.language === "de" ? DE.navigation:ENG.navigation;
          // this.navPageString = result.language === "fr" ? FR.navigation:ENG.navigation;

          switch (result.language) {
            case "en":
              this.navPageString = ENG.navigation
              break;
            case "de":
              this.navPageString = DE.navigation
              break;
            case "fr":
              this.navPageString = FR.navigation
              break;
            case "ru":
              this.navPageString = RU.navigation
              break;
            default:
              this.navPageString = ENG.navigation
          }
        }
      }
    )
  }




}
