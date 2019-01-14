import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookRoomComponent } from './book-room/book-room.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { MyBookingComponent } from './my-booking/my-booking.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book-a-room', component: BookRoomComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'my-booking', component: MyBookingComponent},
  {path: '**', component: HomeComponent}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
