import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  username : string;
  password : string;

  loginFailed:boolean = false;

  constructor(
    readonly router : Router
  ) { }

  ngOnInit() {
  }

  login(){
    if(this.username == 'hello' && this.password == 'hello'){
      //show logged in
      alert("hi");
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
