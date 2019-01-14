import { User } from "./user";

export class BookingQuery {
    _id: string;
    roomId: string;
    seatsBooked: Number;
    imageId: string;
    availableSeats: Number;
    dateOfBooking: Date;
    dateForBooking: Date;
    user: User;
}