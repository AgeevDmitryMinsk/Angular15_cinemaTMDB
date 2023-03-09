import {Component, Input, OnInit} from '@angular/core';
import {IConfigurationLanguages, IGenre} from "../../../interfaces/global";
import {DataService} from "../../../services/data.service";
import {LocalService} from "../../../services/local.service";

@Component({
  selector: 'app-genre-f',
  templateUrl: './genre-f.component.html',
  styleUrls: ['./genre-f.component.scss']
})
export class GenreFComponent implements OnInit{
  languageInLocalStorage: string | null
  language_english_nameInLocalStorage: string | null
  @Input() genre: IGenre | IConfigurationLanguages
  constructor(
    public dataService: DataService,
    private localStore: LocalService
  ) {
  }

  ngOnInit() {
    this.language_english_nameInLocalStorage = "English"
    if(this.localStore.getData("language_english_nameInLocalStorage")) {
      this.language_english_nameInLocalStorage = this.localStore.getData("language_english_nameInLocalStorage")
    }
    console.log("this.language_english_nameInLocalStorage in GenreFComponent", this.language_english_nameInLocalStorage)
  }


}
