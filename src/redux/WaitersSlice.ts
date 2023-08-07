import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseURL } from '../config/axios';
import {
  CreateItemOrderDTO,
  ItemOrderDTO,
  OrderDTO,
} from '../DTO/OrderListDTO';
import { VoucherDTO } from '../DTO/VoucherDTO';
import { WaitersCallDTO } from '../DTO/WaitersCall';

export type initialStates = {
  waitersOrderList: OrderDTO[];
  waitersOrderItem: ItemOrderDTO[];
  waiterOrderId: OrderDTO;
  waitersCall: WaitersCallDTO[];
  loading: boolean;
  notif: boolean;
  error: string;
};

const initialState: initialStates = {
  waitersOrderList: [],
  waitersOrderItem: [],
  waiterOrderId: <OrderDTO>{},
  waitersCall: [],
  loading: false,
  error: '',
  notif: false,
};

export const fetchWaitersOrder = createAsyncThunk(
  'order-waiters/fetchWaitersOrder',
  async () => {
    try {
      const res = await baseURL.get('/orders/waiters/orders', {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      console.log(res.data, 'slice');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchWaitersCall = createAsyncThunk(
  'order-waiters/fetchWaitersCall',
  async () => {
    try {
      const res = await baseURL.get('/waiters-calls');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchWaitersOrderId = createAsyncThunk(
  'order-waiters/fetchWaitersOrderId',
  async (id: number) => {
    try {
      const res = await baseURL.get(`/orders/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchOrderGuest = createAsyncThunk(
  'order-waiters/fetchOrderGuest',
  async (guestId: number) => {
    try {
      const res = await baseURL.get(`/orders/guest/${guestId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchWaitersOrderItem = createAsyncThunk(
  'order-waiters/fetchOrderItem',
  async () => {
    try {
      const res = await baseURL.get('/item-order/waiters/item-order');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const WaitersOrderListSlice = createSlice({
  name: 'order-waiters',
  initialState,
  reducers: {
    getNotif: (state) => {
      state.notif = !state.notif;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWaitersOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWaitersOrder.fulfilled,
      (state, action: PayloadAction<OrderDTO[]>) => {
        state.loading = false;
        state.waitersOrderList = action.payload;
      }
    );
    builder.addCase(fetchWaitersOrder.rejected, (state, action) => {
      state.loading = false;
      state.waitersOrderList = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchWaitersOrderItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWaitersOrderItem.fulfilled,
      (state, action: PayloadAction<ItemOrderDTO[]>) => {
        state.loading = false;
        state.waitersOrderItem = action.payload;
      }
    );
    builder.addCase(fetchWaitersOrderItem.rejected, (state, action) => {
      state.loading = false;
      state.waitersOrderItem = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchWaitersOrderId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWaitersOrderId.fulfilled,
      (state, action: PayloadAction<OrderDTO>) => {
        state.loading = false;
        state.waiterOrderId = action.payload;
      }
    );
    builder.addCase(fetchWaitersOrderId.rejected, (state, action) => {
      state.loading = false;
      state.waiterOrderId = <OrderDTO>{};
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchWaitersCall.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchWaitersCall.fulfilled,
      (state, action: PayloadAction<WaitersCallDTO[]>) => {
        state.loading = false;
        state.waitersCall = action.payload;
      }
    );
    builder.addCase(fetchWaitersCall.rejected, (state, action) => {
      state.loading = false;
      state.waitersCall = [];
      state.error = action.error.message || 'Something went wrong';
    });
    // builder.addCase(fetchOrderGuest.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(
    //   fetchOrderGuest.fulfilled,
    //   (state, action: PayloadAction<OrderDTO>) => {
    //     state.loading = false;
    //     state.yourOrder = action.payload;
    //   }
    // );
    // builder.addCase(fetchOrderGuest.rejected, (state, action) => {
    //   state.loading = false;
    //   state.orderList = [];
    //   state.error = action.error.message || 'Something went wrong';
    // });
    // builder.addCase(fetchOrderItem.pending, (state) => {
    //   state.loading = true;
    // });
    // builder.addCase(
    //   fetchOrderItem.fulfilled,
    //   (state, action: PayloadAction<ItemOrderDTO[]>) => {
    //     state.loading = false;
    //     state.orderItem = action.payload;
    //   }
    // );
    // builder.addCase(fetchOrderItem.rejected, (state, action) => {
    //   state.loading = false;
    //   state.orderItem = [];
    //   state.error = action.error.message || 'Something went wrong';
    // });
  },
});

export const { getNotif } = WaitersOrderListSlice.actions;

export default WaitersOrderListSlice.reducer;
