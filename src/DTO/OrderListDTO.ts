import { CustomerDTO } from './CustomerDTO';
import { FoodDTO } from './FoodDTO';
import { AdminDTO } from './Users';

export type OrderDTO = {
  id: number;
  items: ItemOrderDTO[];
  customer: CustomerDTO;
  totalPrice: number;
  tableId: number;
  table: TableDTO;
  guest: GuestDTO;
  guestId: number;
  orderStatus: OrderStatusDTO;
  orderStatusId: number;
  paymentMethod: string;
  paymentStatus: string;
  tableNumber: number;
  createdBy?: AdminDTO;
  createdById?: number;
  createdAt: Date;
  updatedBy?: AdminDTO;
  updatedById?: number;
  updatedAt: Date;
  finishedCook?: string;
};

export type OrderStatusDTO = {
  id: number;
  status: string;
};

export interface UserDTO {
  user_id: number;
  username: string;
  name: string;
  role: RoleDTO;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export interface RoleDTO {
  id: number;
  role: string;
}

export interface TableDTO {
  id: number;
  table_no: number;
  status: StatusTableDTO;
  createdById: number;
  createdBy: UserDTO;
  updatedById: number;
  updatedBy: UserDTO;
  createdAt: string;
  updatedAt: string;
}

export interface StatusTableDTO {
  id: number;
  status: string;
}

export enum PaymentStatusDTO {
  WAITING_PAYMENT = 'WAITING_PAYMENT',
  CHECKING_PAYMENT = 'CHECKING_PAYMENT',
  PAID = 'PAID',
}

export type ItemStatus = {
  id: string;
  status: string;
};

export type CreateItemOrderDTO = {
  quantity: number;
  foodId: number;
  food: FoodDTO;
  orderId: number;
  note: string;
  status: string;
};

export type ItemOrderDTO = {
  id?: number;
  quantity: number;
  foodId: number;
  orderId: number;
  note?: string;
  food: FoodDTO;
  order?: OrderDTO;
  status?: ItemStatus;
  statusId?: number;
};

export interface GuestDTO {
  guest_id: number;
  name: string;
  phone_number: string;
  createdAt: Date;
}
