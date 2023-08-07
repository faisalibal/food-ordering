import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseURL } from '../config/axios';
import {
  CreateItemOrderDTO,
  ItemOrderDTO,
  ItemStatus,
  OrderDTO,
} from '../DTO/OrderListDTO';
import { VoucherDTO } from '../DTO/VoucherDTO';

export type initialStates = {
  loading: boolean;
  orderList: ItemOrderDTO[];
  orderItem: ItemOrderDTO[];
  statusItem: ItemStatus[];
  yourOrder: OrderDTO;
  voucherUse: VoucherDTO;
  subTotal?: number;
  totalItem?: number;
  taxes?: number;
  voucherValue?: number;
  total?: number;
  error: string;
};

const initialState: initialStates = {
  loading: false,
  orderList: [],
  voucherUse: <VoucherDTO>{},
  statusItem: [],
  orderItem: [],
  yourOrder: <OrderDTO>{},
  subTotal: 0,
  totalItem: 0,
  taxes: 0,
  voucherValue: 0,
  total: 0,
  error: '',
};

export const fetchOrder = createAsyncThunk('order/fetchOrder', async () => {
  try {
    const res = await baseURL.get('/orders');
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchItemStatus = createAsyncThunk(
  'item-order/fetchItemStatus',
  async () => {
    try {
      const res = await baseURL.get('/item-order/item/status');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const fetchItemStatus = createAsyncThunk(
//   'order/fetchStatusItem',
//   async () => {
//     try {
//       const res = await baseURL.get('/item-order/item/status');
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

export const fetchOrderGuest = createAsyncThunk(
  'order/fetchOrderGuest',
  async (guestId: number) => {
    try {
      const res = await baseURL.get(`/orders/guest/${guestId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchOrderItem = createAsyncThunk(
  'order/fetchOrderItem',
  async () => {
    try {
      const res = await baseURL.get('/item-order');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

// export const fetchVoucherOrder = createAsyncThunk(
//   'vouchers/fetchVoucherOrder',
//   async (id: string) => {
//     try {
//       const res = await baseURL.get(`/vouchers/${id}`);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// export const getOrderSubTotal = (orderList: ItemOrderDTO[]): number => {
//   const total = orderList?.reduce(
//     (amount, item) => item.food.price * item.quantity + amount,
//     0
//   );
//   return total;
// };

// type totalItem = {
//   orderList: ItemOrderDTO[];
//   voucherUse: VoucherDTO;
// };

// export const getOrderTotalItem = (orderList: ItemOrderDTO[]): number => {
//   const totalItem = orderList?.reduce(
//     (amount, item) => item.quantity + amount,
//     0
//   );
//   return totalItem;
// };

// export const getVoucher = ({ orderList, voucherUse }: totalItem) => {
//   let totalItem = orderList?.reduce(
//     (amount, item) => item.food.price * item.quantity + amount,
//     0
//   );
//   if (voucherUse.value !== 0) {
//     totalItem = (totalItem * voucherUse.value) / 100;
//     return totalItem;
//   }
//   return 0;
// };

// export const getOrderTaxes = (orderList: ItemOrderDTO[]): number => {
//   const subTotal = orderList?.reduce(
//     (amount, item) => item.food.price * item.quantity + amount,
//     0
//   );
//   const taxes = (subTotal * 10) / 100; //taxes 10%//
//   return taxes;
// };

// export const getOrderTotal = ({ orderList, voucherUse }: totalItem): number => {
//   let subTotal = orderList?.reduce(
//     (amount, item) => item.food.price * item.quantity + amount,
//     0
//   );
//   if (voucherUse.value) {
//     const totalVoucher = (subTotal * voucherUse.value) / 100;
//     subTotal = subTotal - totalVoucher;
//   }
//   const taxes = (subTotal * 10) / 100; //taxes 10%//
//   const total = subTotal + taxes;
//   return total;
// };

// export const postOrderList = createAsyncThunk(
//   'orderList/postOrderList',
//   async (value: OrderListDTO) => {
//     return await baseURL.post(`/order-list`, value);
//   }
// );

// export const updateOrderList = createAsyncThunk(
//   'orderList/updateOrderList',
//   async (updatedValue: OrderListDTO) => {
//     return await baseURL.put(`/order-list/${updatedValue.id}`, updatedValue);
//   }
// );

// export const deleteOrderList = createAsyncThunk(
//   'orderList/deleteOrderList',
//   async (id: string) => {
//     try {
//       const res = await baseURL.delete(`/order-list/${id}`);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const OrderListSlice = createSlice({
  name: 'order-list',
  initialState,
  reducers: {
    setOrderItem: (state, action) => {
      const newItem = action.payload; // Item baru yang akan ditambahkan ke orderList
      const updatedOrderList = state.orderList.map((item) => {
        return item;
      });
      updatedOrderList.push(newItem);
      state.orderList = updatedOrderList;
      localStorage.setItem('orderList', JSON.stringify(state.orderList));
    },
    removeOrderItem: (state, action) => {
      const itemIndex = action.payload; // Indeks item yang akan dihapus dari orderList
      const newOrderList = [...state.orderList]; // Salin orderList ke array baru
      newOrderList.splice(itemIndex, 1);
      state.orderList = newOrderList; // Menghapus item dari orderList menggunakan splice()
      localStorage.setItem('orderList', JSON.stringify(state.orderList));
    },
    updateOrderItem: (state, action) => {
      const updateValue = action.payload;
      const updatedOrderList = state.orderList.map((item) => {
        if (item.foodId === updateValue.foodId) {
          return updateValue;
        }
        return item;
      });
      state.orderList = updatedOrderList; // Mengganti item lama dengan item yang baru di orderList
      localStorage.setItem('orderList', JSON.stringify(state.orderList));
    },
    setTotalOrder: (state, action) => {
      state.total = action.payload;
    },
    setTotalItem: (state, action) => {
      state.totalItem = action.payload;
    },
    setTaxes: (state, action) => {
      state.taxes = action.payload;
    },
    setSubTotal: (state, action) => {
      state.subTotal = action.payload;
    },
    setVoucherValue: (state, action) => {
      state.voucherValue = action.payload;
    },
    setOrderListEmpty: (state) => {
      state.orderList = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchOrder.fulfilled,
      (state, action: PayloadAction<OrderDTO>) => {
        state.loading = false;
        state.yourOrder = action.payload;
      }
    );
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.loading = false;
      state.orderList = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchOrderGuest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchOrderGuest.fulfilled,
      (state, action: PayloadAction<OrderDTO>) => {
        state.loading = false;
        state.yourOrder = action.payload;
      }
    );
    builder.addCase(fetchOrderGuest.rejected, (state, action) => {
      state.loading = false;
      state.orderList = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchOrderItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchOrderItem.fulfilled,
      (state, action: PayloadAction<ItemOrderDTO[]>) => {
        state.loading = false;
        state.orderItem = action.payload;
      }
    );
    builder.addCase(fetchOrderItem.rejected, (state, action) => {
      state.loading = false;
      state.orderItem = [];
      state.error = action.error.message || 'Something went wrong';
    });

    builder.addCase(fetchItemStatus.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchItemStatus.fulfilled,
      (state, action: PayloadAction<ItemStatus[]>) => {
        state.loading = false;
        state.statusItem = action.payload;
      }
    );
    builder.addCase(fetchItemStatus.rejected, (state, action) => {
      state.loading = false;
      state.statusItem = [];
      state.error = action.error.message || 'Something went wrong';
    });
    // builder.addCase(postOrderList.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(postOrderList.fulfilled, (state) => {
    //   state.loading = false;
    //   state.error = '';
    // });
    // builder.addCase(postOrderList.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || 'Something went wrong';
    // });
    // builder.addCase(deleteOrderList.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(deleteOrderList.fulfilled, (state) => {
    //   state.loading = false;
    //   state.error = '';
    // });
    // builder.addCase(deleteOrderList.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || 'Something went wrong';
    // });
    // builder.addCase(updateOrderList.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(updateOrderList.fulfilled, (state) => {
    //   state.loading = false;
    //   state.error = '';
    // });
    // builder.addCase(updateOrderList.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.error.message || 'Something went wrong';
    // });
    // builder.addCase(fetchVoucherOrder.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(
    //   fetchVoucherOrder.fulfilled,
    //   (state, action: PayloadAction<VoucherDTO>) => {
    //     state.loading = false;
    //     state.voucherUse = action.payload;
    //     state.error = '';
    //   }
    // );
    // builder.addCase(fetchVoucherOrder.rejected, (state, action) => {
    //   state.loading = false;
    //   state.voucherUse = <VoucherDTO>{};
    //   state.error = action.error.message || 'Something went wrong';
    // });
  },
});

export const {
  setOrderItem,
  removeOrderItem,
  updateOrderItem,
  setSubTotal,
  setTaxes,
  setTotalItem,
  setTotalOrder,
  setVoucherValue,
  setOrderListEmpty,
} = OrderListSlice.actions;

export default OrderListSlice.reducer;
