import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookRoomComponent } from './book-room/book-room.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'book-a-room', component: BookRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
