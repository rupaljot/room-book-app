import { Component, OnInit } from '@angular/core';
import { RoomService } from "../_services/room.service";
import { SharedService } from "../_services/shared.service";

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

  constructor(
    private readonly room: RoomService,
    public shared: SharedService
  ) { }

  ngOnInit() {
    let user = this.shared.user;
    this.room.getRoomsBookedByTheUser(user).subscribe(data => {
      console.log(data);
    });
  }

  searchForData(){
    alert(this.minDate + "" + this.maxDate + "" + this.numberOfSeats + "" + this.selectedDate);
  }

}
