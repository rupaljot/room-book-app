import { Injectable } from '@angular/core';
import { BaseService } from "./base.service";

import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(
    private readonly base: BaseService
  ) { 
    
  }

  registerUser(user: User){
    return this.base.postMethod(user, 'work/register');
  }

  findUser(user: User){
    return this.base.postMethod(user, 'work/getUser');
  }

}
