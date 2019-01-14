import { Component, OnInit , Inject} from '@angular/core';
import { SharedService } from "../_services/shared.service";
import { RoomService } from '../_services/room.service';
import { User } from '../models/user';
import { Seats } from '../models/seats';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-my-booking',
  templateUrl: './my-booking.component.html',
  styleUrls: ['./my-booking.component.scss']
})
export class MyBookingComponent implements OnInit {

  user : User;
  bookedSeats : Seats[];

  display : boolean = false;

  editRoom;

  oldSeats : number =null;

  constructor(
    readonly shared : SharedService,
    readonly room: RoomService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    let user = new User();
    user = this.shared.user;
    this.room.getRoomsBookedByTheUser(user).subscribe((data: User) => {
      user = data;
      this.bookedSeats = user.noOfSeatsBooked;
    })
  }

  editDetails(room){
    this.editRoom = room;
    this.oldSeats = room.seatsBooked;
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {room: this.room}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      this.editRoom.oldDateForBooking = this.editRoom.dateForBooking;
      if(result.dateForBooking)
        this.editRoom.dateForBooking = result.dateForBooking;
      if(result.seatsBooked)
        this.editRoom.seatsBooked = result.seatsBooked;
      this.editRoom.oldSeats = this.oldSeats;
      this.editRoom.user = this.shared.user;
      this.room.editDetails(this.editRoom).subscribe(data => {

      })
    });
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'edit-dialog.component.html',
})
export class DialogOverviewExampleDialog {

  minDate = new Date();
  maxDate = new Date(2019,11,31);

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}