import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
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
    //console.log("this.languageInLocalStorage in HeaderComponent", this.languageInLocalStorage)

    if (this.languageInLocalStorage) {
      //console.log(`this.languageInLocalStorage exist`)
      this.dataService.languageSelected.next({language: this.languageInLocalStorage})
    }

    this.dataService.languageSelected.subscribe(
      {
        next: (result) => {
          //console.log("languageSelected result in HeaderComponent", result.language)
          this.languageFromQueryParams = result.language
          this.navPageString = this.dataService.getLanguage(result.language, 'navigation')

          // switch (result.language) {
          //   case "de":
          //     this.navPageString = DE.navigation
          //     break;
          //   case "en":
          //     this.navPageString = ENG.navigation
          //     break;
          //   case "fr":
          //     this.navPageString = FR.navigation
          //     break;
          //   case "pl":
          //     this.navPageString = PL.navigation
          //     break;
          //   case "ru":
          //     this.navPageString = RU.navigation
          //     break;
          //   case "uk":
          //     this.navPageString = UKR.navigation
          //     break;
          //   case "be":
          //     this.navPageString = BLR.navigation
          //     break;
          //   case "ja":
          //     this.navPageString = JA.navigation
          //     break;
          //   default:
          //     this.navPageString = ENG.navigation
          // }
        }
      }
    )



  }




}
