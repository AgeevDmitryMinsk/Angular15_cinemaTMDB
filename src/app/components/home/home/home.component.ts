import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {DataService} from "../../../services/data.service";
import {IHomePageLanguage, IMovieResults} from "../../../interfaces/global";
import {Router} from "@angular/router";
import {LocalService} from "../../../services/local.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  myInput: string = ''
  multiSearchResults: IMovieResults[]
  profileForm = new FormGroup({
    myInput: new FormControl(''),
  });
  languageFromQueryParams: string;
  languageInLocalStorage: string | null
  public homePageString:IHomePageLanguage;

  constructor(
    private dataService: DataService,
    public router: Router,
    private localStore: LocalService,
  ) {
  }

  ngOnInit(): void {
    this.languageInLocalStorage = this.localStore.getData("languageInLocalStorage")
    console.log("this.languageInLocalStorage in HomeComponent", this.languageInLocalStorage)

    if (this.languageInLocalStorage) {
      console.log(`this.languageInLocalStorage exist in HomeComponent`)
      this.dataService.languageSelected.next({language: this.languageInLocalStorage})
    }

    this.dataService.languageSelected.subscribe(
      {
        next: (result) => {
          this.languageFromQueryParams = result.language
          this.homePageString = this.dataService.getLanguage(result.language, 'home')

        }
      }
    )
  }

  onSubmit() {
    console.log(this.profileForm.value);
    this.dataService.page = 1
    this.dataService.insideIndex = 1
    console.log("page after click onSubmit = ", this.dataService.page)
    if (this.profileForm.value.myInput) {
      this.dataService.getSearch(this.profileForm.value.myInput).subscribe((el) => {
        this.multiSearchResults = el.results
        console.log(" ******* ********* ******** this.multiSearchResults = ", this.multiSearchResults)
      })

      this.router.navigate(
        ['search', this.profileForm.value.myInput],
        {
          state: {id: '990909090', name: "что-то другое"},
          queryParams: {
            'query': this.profileForm.value.myInput
          }
        }
      )
    }


  }


}
