// export type ReservationDTO = {
//   id: number;
//   name: string;
//   phone: string;
//   date: string;
//   time: string;
//   pax: number;
// };

import { CustomerDTO } from './CustomerDTO';

export interface ReservationDto {
  reservation_id: number;
  status: number;
  customerId: number;
  customers: CustomerDTO;
  date_reservation: Date;
  time_reservation: string;
  pax: number;
  actionById: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TimeDto {
  time_id: number;
  time: string;
}
