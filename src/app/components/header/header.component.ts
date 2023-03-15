import {Component, OnInit} from '@angular/core';
import {ENG} from "../../strings/ENG/eng-string";
import {RU} from "../../strings/RU/ru-string";
import {DataService} from "../../services/data.service";
import {DE} from "../../strings/DE/de-string";
import {FR} from "../../strings/FR/fr-string";
import {PL} from "../../strings/PL/pl-string";
import {UKR} from "../../strings/UK/ukr-string";
import {BLR} from "../../strings/BLR/blr-string";
import {JA} from "../../strings/JA/jpn-string";
import {INavigationLanguage} from "../../interfaces/global";
import {LocalService} from "../../services/local.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  languageFromQueryParams: string;
  languageInLocalStorage: string | null
  public navPageString:INavigationLanguage;

  constructor(
    public dataService: DataService,
    private localStore: LocalService,
    ){
  }
  public ngOnInit(): void {

    this.languageInLocalStorage = this.localStore.getData("languageInLocalStorage")
    console.log("this.languageInLocalStorage in HeaderComponent", this.languageInLocalStorage)

    if (this.languageInLocalStorage) {
      console.log(`this.languageInLocalStorage exist`)
      this.dataService.languageSelected.next({language: this.languageInLocalStorage})
      switch (this.languageInLocalStorage) {
        case "de":
          this.navPageString = DE.navigation
          break;
        case "en":
          this.navPageString = ENG.navigation
          break;
        case "fr":
          this.navPageString = FR.navigation
          break;
        case "pl":
          this.navPageString = PL.navigation
          break;
        case "ru":
          this.navPageString = RU.navigation
          break;
        case "uk":
          this.navPageString = UKR.navigation
          break;
        case "be":
          this.navPageString = BLR.navigation
          break;
        case "ja":
          this.navPageString = JA.navigation
          break;
        default:
          this.navPageString = ENG.navigation
      }
    }

    this.dataService.languageSelected.subscribe(
      {
        next: (result) => {
          console.log("languageSelected result in HeaderComponent", result.language)
          this.languageFromQueryParams = result.language

          switch (result.language) {
            case "de":
              this.navPageString = DE.navigation
              break;
            case "en":
              this.navPageString = ENG.navigation
              break;
            case "fr":
              this.navPageString = FR.navigation
              break;
            case "pl":
              this.navPageString = PL.navigation
              break;
            case "ru":
              this.navPageString = RU.navigation
              break;
            case "uk":
              this.navPageString = UKR.navigation
              break;
            case "be":
              this.navPageString = BLR.navigation
              break;
            case "ja":
              this.navPageString = JA.navigation
              break;
            default:
              this.navPageString = ENG.navigation
          }
        }
      }
    )



  }




}
