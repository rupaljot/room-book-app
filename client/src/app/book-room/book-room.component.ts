import { Component, OnInit } from '@angular/core';
import { RoomService } from "../_services/room.service";
import { Router } from "@angular/router";
import { SharedService } from "../_services/shared.service";

import {User} from '../models/user';
import {Seats} from '../models/seats';
import { BookingQuery } from '../models/booking-query';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {

  minDate = new Date();
  maxDate = new Date(2019,11,31);

  numberOfSeats : Seats[];

  selectedDate : Date;
  queriedSeats : number = null;

  constructor(
    private readonly room: RoomService,
    public shared: SharedService,
    private router : Router
  ) { }

  ngOnInit() {
    
  }

  searchForData(){
    let seatsQuery = new Seats();
    seatsQuery.seatsBooked = this.queriedSeats;
    
    this.room.getRoomsAvailable(seatsQuery).subscribe(( data : Seats[]) => {
      this.numberOfSeats = data;
    });
  }

  bookTheRoom(seat: Seats){
    let bookingQuery = new BookingQuery();
    bookingQuery.seatsBooked = this.queriedSeats;
    bookingQuery.imageId = seat.imageId;
    bookingQuery.roomId = seat.roomId;
    bookingQuery.dateOfBooking = new Date();
    bookingQuery.dateForBooking = this.selectedDate;
    bookingQuery.user = this.shared.user;

    this.room.bookASlot(bookingQuery).subscribe(data =>{
      console.log(data);
    })
  }

  myBooking(){
    this.router.navigate(['/my-booking']);
  }

}
