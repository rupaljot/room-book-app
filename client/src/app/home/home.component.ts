import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { User } from "../models/user";

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
    if(this.username && this.password){
      let user = new User();
      user.username = this.username;
      user.password = this.password;
      this.room.findUser(user).subscribe(data => {
        console.log(data);
      });
      this.router.navigate(['/book-a-room']);
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
