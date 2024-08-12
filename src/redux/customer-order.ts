import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseURL } from '../config/axios';
import { CustomerOrderDTO } from '../DTO/CustomerOrders';
import { OrderListDTO } from '../DTO/OrderListDTO';

export type initialStates = {
  loading: boolean;
  orderList: OrderListDTO[];
  customerOrder: CustomerOrderDTO[];
  customerOrderId: CustomerOrderDTO;
  subTotal?: number;
  totalItem?: number;
  taxes?: number;
  total?: number;
  error: string;
};

const initialState: initialStates = {
  loading: false,
  orderList: [],
  customerOrder: [],
  customerOrderId: <CustomerOrderDTO>{},
  subTotal: 0,
  totalItem: 0,
  taxes: 0,
  total: 0,
  error: '',
};

export const fetchOrderList = createAsyncThunk(
  'orderList/fetchOrderList',
  async () => {
    try {
      const res = await baseURL.get('/order-list');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrderSubTotal = (orderList: OrderListDTO[]): number => {
  const total = orderList?.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  return total;
};

export const getOrderTotalItem = (orderList: OrderListDTO[]): number => {
  const totalItem = orderList?.reduce(
    (amount, item) => item.quantity + amount,
    0
  );
  return totalItem;
};

export const getOrderTaxes = (orderList: OrderListDTO[]): number => {
  const subTotal = orderList?.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const taxes = (subTotal * 10) / 100; //taxes 10%//
  return taxes;
};

export const getOrderTotal = (orderList: OrderListDTO[]): number => {
  const subTotal = orderList?.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const taxes = (subTotal * 10) / 100; //taxes 10%//
  const total = subTotal + taxes;
  return total;
};

export const postOrderList = createAsyncThunk(
  'orderList/postOrderList',
  async (value: OrderListDTO) => {
    return await baseURL.post(`/order-list`, value);
  }
);

export const updateOrderList = createAsyncThunk(
  'orderList/updateOrderList',
  async (updatedValue: OrderListDTO) => {
    return await baseURL.put(`/order-list/${updatedValue.id}`, updatedValue);
  }
);

export const deleteOrderList = createAsyncThunk(
  'orderList/deleteOrderList',
  async (id: string) => {
    try {
      const res = await baseURL.delete(`/order-list/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const OrderListSlice = createSlice({
  name: 'order-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrderList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchOrderList.fulfilled,
      (state, action: PayloadAction<OrderListDTO[]>) => {
        state.loading = false;
        state.orderList = action.payload;
        state.subTotal = getOrderSubTotal(state.orderList);
        state.totalItem = getOrderTotalItem(state.orderList);
        state.taxes = getOrderTaxes(state.orderList);
        state.total = getOrderTotal(state.orderList);
        state.error = '';
      }
    );
    builder.addCase(fetchOrderList.rejected, (state, action) => {
      state.loading = false;
      state.orderList = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(postOrderList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postOrderList.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(postOrderList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(deleteOrderList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteOrderList.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteOrderList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(updateOrderList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateOrderList.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(updateOrderList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default OrderListSlice.reducer;
