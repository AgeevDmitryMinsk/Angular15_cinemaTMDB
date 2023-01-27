import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-test-card-detailed',
  templateUrl: './test-card-detailed.component.html',
  styleUrls: ['./test-card-detailed.component.scss']
})
export class TestCardDetailedComponent {

  cardDetailMovieID: number

  constructor(
    public dataService: DataService){
    this.dataService.movieID.subscribe((result) => {

      // console.log('result in TestCardDetailedComponent = ', result )
      this.cardDetailMovieID = result
    })
  }

  ngOnInit(): void {

      }



}
