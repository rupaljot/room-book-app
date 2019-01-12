import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { RoomService } from "../_services/room.service";
import { User } from "../models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  username: string = null;
  password: string = null;
  confirmPassword: string = null;
  message: string =  null;

  constructor(
    private readonly room: RoomService,
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  register(){
    this.message = null;
    if(this.username){
      if(this.password && this.password == this.confirmPassword){
        let user = new User();
        user.username = this.username;
        user.password = this.password;
        this.room.registerUser(user).subscribe(data =>{
          console.log(data);
        });
      }else{
        this.message = "Passwords do not match";
      }
    }else{
      this.message = "Username cannot be empty";
    }
  }

  reset(){
    this.message = null;
    this.username = null;
    this.password = null;
    this.confirmPassword = null;
  }

}
