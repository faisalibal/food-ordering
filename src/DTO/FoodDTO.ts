// export type FoodDTO = {
//   id: string;
//   kategory: string;
//   name: string;
//   price: number;
//   available: boolean;
//   image: string;
//   description: string;
// };

import { ItemOrderDTO } from './OrderListDTO';

export type FoodDTO = {
  id: number;
  name: string;
  spicyId: number;
  spicy_level: FoodSpicyLevelDTO;
  image: string;
  price: number;
  description: string;
  cook_estimate: number;
  availability: boolean;
  item_order: ItemOrderDTO[];
  category: FoodCategoryDTO;
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

// export type ItemOrderDTO = {
//   id: number;
//   status: string;
//   quantity: number;
//   food: FoodDTO;
//   orderId: number;
// };

export type FoodCategoryDTO = {
  id: number;
  category: string;
  image: string;
  foods: FoodDTO[];
};

export type FoodSpicyLevelDTO = {
  id: number;
  level: number;
  // Add any additional fields from the `FoodSpicyLevel` model that you want to include in the DTO
};
