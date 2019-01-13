import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";
import { SharedService } from "./shared.service";

import { User } from "../models/user";

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
    return this.base.getMethod('work/userData');
  }

  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.base.authToken = token;
    this.shared.user = user;
  }

}
