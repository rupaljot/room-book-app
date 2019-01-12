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
  MatNativeDateModule
} from '@angular/material';
import { BookRoomComponent } from './book-room/book-room.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BookRoomComponent,
    MyBookingsComponent,
    RegisterComponent
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
    MatNativeDateModule
  ],
  providers: [
    BaseService,
    RoomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
