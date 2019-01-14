import { Component, OnInit } from '@angular/core';
import { RoomService } from "../_services/room.service";
import { Seats } from "../models/seats";

import { FileSelectDirective, FileUploader } from "ng2-file-upload";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {

  roomId : string = null;
  seats : number = null;
  valid : boolean = true;
  files : any[];
  url: string = null;

  uploader: FileUploader;

  apiUrl = 'http://localhost:8080/work/admin';

  constructor(
    readonly room : RoomService
  ) { }

  ngOnInit() {
    this.uploader = new FileUploader({url: this.apiUrl});
  }

  registerRoom(){
    if( this.roomId && this.seats ){
      let seats = new Seats();
      seats.roomId =  this.roomId;
      seats.seatsBooked = this.seats;
      seats.imageId = this.roomId;
      this.room.registerRoom(seats).subscribe(data => {
        console.log(data);
      });
    }
  }

  checkAvailability(){
    alert("hello");
    
    this.room.checkRoomId(this.roomId).subscribe(data => {
      this.valid= false;
    });
  }

  reset(){
    this.seats = null;
    this.roomId = null;
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
    let file = event.target.files[0];
    let fileName = file.name;
    alert(fileName);
  }
  
  // onUpload() {
    
  //   const formData = new FormData();
  //   for (const file of this.files) {
  //       formData.append(name, file, file.name);
  //   }
  //   this.http.post('url', formData).subscribe(x => ....);
  // }

}
