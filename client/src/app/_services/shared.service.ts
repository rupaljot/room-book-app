import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { Seats } from '../models/seats';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  user: User;
  seats: Seats;

  imageEnum;

  constructor() {
    this.imageEnum ={
      'image1' : './assets/img/image1.jpg',
      'image2' : './assets/img/image2.jpg'
    };
   }
}
