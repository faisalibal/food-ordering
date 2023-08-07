import { OrderDTO } from './OrderListDTO';
import { ReservationDto } from './ReservationDTO';
import { AdminDTO } from './Users';

export type CustomerDTO = {
  customerId: number;
  customerName: string;
  email: string;
  phoneNumber: string;
  reservations: ReservationDto[];
  orders: OrderDTO[];
  createdBy?: AdminDTO;
  createdById?: number;
  updatedBy?: AdminDTO;
  updatedById?: number;
  createdAt: Date;
  updatedAt: Date;
};
