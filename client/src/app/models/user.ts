export class Seats  {
    roomId: Number;
    seatsBooked: Number;
  };

export class User  {
    username: string;
    noOfSeatsBooked: Seats[]; 
    password: string;
  };