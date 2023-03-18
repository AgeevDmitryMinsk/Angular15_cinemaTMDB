import {Component, Input} from '@angular/core';
import {base_image_URL, DataService} from 'src/app/services/data.service';
import {ImovieCardFLanguage, IMovieResults} from "../../../interfaces/global";
import {LocalService} from "../../../services/local.service";
import {DE} from "../../../strings/DE/de-string";
import {ENG} from "../../../strings/ENG/eng-string";
import {FR} from "../../../strings/FR/fr-string";
import {PL} from "../../../strings/PL/pl-string";
import {RU} from "../../../strings/RU/ru-string";
import {UKR} from "../../../strings/UK/ukr-string";
import {BLR} from "../../../strings/BLR/blr-string";
import {JA} from "../../../strings/JA/jpn-string";

@Component({
  selector: 'app-movie-card-f',
  templateUrl: './movie-card-f.component.html',
  styleUrls: ['./movie-card-f.component.scss']
})
export class MovieCardFComponent {
  @Input() movie: IMovieResults
  base_image_URL: string = base_image_URL;
  public movieCardFPageString:ImovieCardFLanguage;
  languageFromQueryParams: string;
  languageInLocalStorage: string | null

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
          this.movieCardFPageString = DE.movieCardF
          break;
        case "en":
          this.movieCardFPageString = ENG.movieCardF
          break;
        case "fr":
          this.movieCardFPageString = FR.movieCardF
          break;
        case "pl":
          this.movieCardFPageString = PL.movieCardF
          break;
        case "ru":
          this.movieCardFPageString = RU.movieCardF
          break;
        case "uk":
          this.movieCardFPageString = UKR.movieCardF
          break;
        case "be":
          this.movieCardFPageString = BLR.movieCardF
          break;
        case "ja":
          this.movieCardFPageString = JA.movieCardF
          break;
        default:
          this.movieCardFPageString = ENG.movieCardF
      }
    }

    this.dataService.languageSelected.subscribe(
      {
        next: (result) => {
          console.log("languageSelected result in HeaderComponent", result.language)
          this.languageFromQueryParams = result.language

          switch (result.language) {
            case "de":
              this.movieCardFPageString = DE.movieCardF
              break;
            case "en":
              this.movieCardFPageString = ENG.movieCardF
              break;
            case "fr":
              this.movieCardFPageString = FR.movieCardF
              break;
            case "pl":
              this.movieCardFPageString = PL.movieCardF
              break;
            case "ru":
              this.movieCardFPageString = RU.movieCardF
              break;
            case "uk":
              this.movieCardFPageString = UKR.movieCardF
              break;
            case "be":
              this.movieCardFPageString = BLR.movieCardF
              break;
            case "ja":
              this.movieCardFPageString = JA.movieCardF
              break;
            default:
              this.movieCardFPageString = ENG.movieCardF
          }
        }
      }
    )



  }
}
