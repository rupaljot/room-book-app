import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { SharedService } from "./shared.service";

import { User } from "../models/user";

import { Seats } from "../models/seats";
import { BookingQuery } from '../models/booking-query';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private readonly base: BaseService,
    public shared: SharedService
  ) { 
    
  }

  registerUser(user: User){
    return this.base.postMethod(user, 'work/register');
  }

  findUser(user: User){
    return this.base.postMethod(user, 'work/getUser');
  }

  getRoomsBookedByTheUser(user: User){
    return this.base.postMethod(user, 'work/userData');
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.base.authToken = token;
    this.shared.user = user;
  }

  registerRoom(seats : Seats){
    return this.base.postMethod(seats, 'work/admin');
  }

  checkRoomId(id: string){
    let seats = new Seats();
    seats.roomId = id;
    return this.base.postMethod(seats, 'work/seatCheck');
  }

  getRoomsAvailable(seats: Seats){
    return this.base.postMethod(seats, 'work/rooms');
  }

  bookASlot(bookingQuery: BookingQuery){
    return this.base.postMethod(bookingQuery, 'work/book');
  }
  
  editDetails(room){
    return this.base.postMethod(room, 'work/editDetails');
  }
}
