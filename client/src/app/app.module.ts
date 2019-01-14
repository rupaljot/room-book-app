import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { BaseService } from "./_services/base.service";
import { RoomService } from "./_services/room.service";
import { SharedService } from "./_services/shared.service";
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';

import { 
  MatButtonModule, 
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatCardModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule
} from '@angular/material';
import { BookRoomComponent } from './book-room/book-room.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { MyBookingComponent, DialogOverviewExampleDialog } from './my-booking/my-booking.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookRoomComponent,
    RegisterComponent,
    AdminComponent,
    MyBookingComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    BrowserAnimationsModule,  
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule
  ],
  providers: [
    BaseService,
    SharedService,
    RoomService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [DialogOverviewExampleDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
