import {Component, Input} from '@angular/core';
import {base_image_URL, DataService} from 'src/app/services/data.service';
import {ImovieCardFLanguage, IMovieResults} from "../../../interfaces/global";
import {LocalService} from "../../../services/local.service";

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
    }

    this.dataService.languageSelected.subscribe(
      {
        next: (result) => {
          console.log("languageSelected result in HeaderComponent", result.language)
          this.languageFromQueryParams = result.language
          this.movieCardFPageString = this.dataService.getLanguage(result.language, 'movieCardF')

        }
      }
    )



  }
}
