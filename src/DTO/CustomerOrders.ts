export type CustomerOrderDTO = {
  customerOrderId: string;
  detailOrder: {
    id: string;
    kategory: string;
    name: string;
    price: number;
    quantity: number;
    note: string;
    status: string;
    image: string;
  };
};
