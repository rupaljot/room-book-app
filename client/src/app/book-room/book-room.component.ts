import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {

  minDate = new Date();
  maxDate = new Date(2019,11,31);

  numberOfSeats : number;

  selectedDate : Date;

  constructor() { }

  ngOnInit() {
  }

  searchForData(){
    alert(this.minDate + "" + this.maxDate + "" + this.numberOfSeats + "" + this.selectedDate);
  }

}
