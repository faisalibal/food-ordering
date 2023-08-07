import { TableDTO } from './OrderListDTO';

export interface WaitersCallDTO {
  id?: number;
  tableId?: number;
  table?: TableDTO;
  action: boolean;
  createdAt?: string;
  updatedAt?: string;
}
