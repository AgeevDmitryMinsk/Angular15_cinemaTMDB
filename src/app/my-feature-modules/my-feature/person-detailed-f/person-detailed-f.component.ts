import {Component} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {base_image_URL, DataService} from "../../../services/data.service";
import {IMoviePeopleCredits, IPersonDetails, IPersonDetailsExternal_ids} from "../../../interfaces/global";

const today = new Date();

@Component({
  selector: 'app-person-detailed-f',
  templateUrl: './person-detailed-f.component.html',
  styleUrls: ['./person-detailed-f.component.scss']
})
export class PersonDetailedFComponent {

  private routeSubscription: Subscription;
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday:  string
  deathday? :  string
  gender: number
  homepage?: string
  personID: number
  imdb_id  : string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string
  base_image_URL: string = base_image_URL
  imageCardPoster:string
  cast: any
  actorDetailsExternal_ids: IPersonDetailsExternal_ids

  actorDetails: IPersonDetails
  actorDetailsKnownFor: IMoviePeopleCredits
  age:number
  nowYear: number
  currentMonth: number
  birthdayMonth:number




  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
  ) {
    this.routeSubscription = route.params.subscribe(params => this.personID = Number(params['id']));
    //console.log("this.personID: ",this.personID) // this.personID:  1305610
    this.nowYear = today.getFullYear();
  }


  ngOnInit(): void {
    this.dataService.actorID.next(this.personID) // кладу в переменную actorID новое значение actorID и потом отслеживаю его через this.dataService.actorID.subscribe в другом Component-е
    this.dataService.getActorDetails(this.personID).subscribe(value => {
      //console.log(value.actorDetailsFromDataService)
      this.actorDetails = value.actorDetailsFromDataService
      // this.name = value.actorDetailsFromDataService.name
      // this.gender = value.actorDetailsFromDataService.gender
      // this.biography = value.actorDetailsFromDataService.biography
      // this.also_known_as = value.actorDetailsFromDataService.also_known_as
      // this.birthday = value.actorDetailsFromDataService.birthday
      // this.deathday = value.actorDetailsFromDataService.deathday
      // this.homepage = value.actorDetailsFromDataService.homepage
      // this.known_for_department = value.actorDetailsFromDataService.known_for_department
      // this.imdb_id = value.actorDetailsFromDataService.imdb_id
      // this.place_of_birth = value.actorDetailsFromDataService.place_of_birth
      // this.popularity = value.actorDetailsFromDataService.popularity
      // this.profile_path = value.actorDetailsFromDataService.profile_path
      // this.adult = value.actorDetailsFromDataService.adult
      // this.imageCardPoster = this.base_image_URL + this.profile_path
      this.imageCardPoster = this.base_image_URL + this.actorDetails.profile_path
      this.currentMonth = today.getMonth();
      this.birthdayMonth = Number(this.actorDetails.birthday?.slice(5,7))
      this.age = this.nowYear - Number(this.actorDetails.birthday?.slice(0,4)) - ((this.birthdayMonth>this.currentMonth)?1:0)
      value})
    this.dataService.getActorDetailsKnownFor(this.personID).subscribe(valuE=>{
      //console.log(valuE)
      this.cast = valuE.actorDetailsKnownForFromDataService.cast
      this.actorDetailsKnownFor = valuE.actorDetailsKnownForFromDataService
      valuE
    })
    this.dataService.getActorDetailsExternal_ids(this.personID).subscribe(value=>{
      console.log(value)
      this.actorDetailsExternal_ids = value.actorDetailsExternal_idsFromDataService
    })
  }

  //link to external resource of selected film (facebook, instagram, twitter, homeFilmPage)
  goToLink(url: string) {
    window.open(url, "_blank");
  }

}
