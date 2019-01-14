import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../models/user";
import { Seats } from "../models/seats";
import { Response } from "../models/login-response";

import { RoomService } from "../_services/room.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username : string = null;
  password : string = null;

  loginFailed:boolean = false;

  constructor(
    readonly router : Router,
    readonly room : RoomService
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.username && this.password && this.username !='admin' && this.password !='admin'){
      let user = new User();
      user.username = this.username;
      user.password = this.password;
      this.room.findUser(user).subscribe((data : Response) => {
        this.room.storeUserData(data.token, data.user);
        this.router.navigate(['/book-a-room']);
      });
      
    }else if (this.username =='admin' && this.password =='admin'){
      this.router.navigate(['/admin']);
    }else{
      //error
      this.loginFailed = true;
    }
  }

  reset(){
    this.username = null;
    this.password = null;
  }

}
