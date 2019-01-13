import { Injectable } from '@angular/core';
import { User } from "../models/user";
import { Seats } from '../models/seats';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  user: User;
  seats: Seats;

  constructor() { }
}
