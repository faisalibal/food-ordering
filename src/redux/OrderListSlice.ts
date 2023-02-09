import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiJsonServer } from '../config/axios';
import { OrderListDTO } from '../DTO/OrderListDTO';
import { VoucherDTO } from '../DTO/VoucherDTO';

export type initialStates = {
  loading: boolean;
  orderList: OrderListDTO[];
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
  subTotal: 0,
  totalItem: 0,
  taxes: 0,
  voucherValue: 0,
  total: 0,
  error: '',
};
export const fetchOrderList = createAsyncThunk(
  'orderList/fetchOrderList',
  async () => {
    try {
      const res = await apiJsonServer.get('/order-list');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchVoucherOrder = createAsyncThunk(
  'vouchers/fetchVoucherOrder',
  async (id: string) => {
    try {
      const res = await apiJsonServer.get(`/vouchers/${id}`);
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

type totalItem = {
  orderList: OrderListDTO[];
  voucherUse: VoucherDTO;
};

export const getOrderTotalItem = (orderList: OrderListDTO[]): number => {
  const totalItem = orderList?.reduce(
    (amount, item) => item.quantity + amount,
    0
  );
  return totalItem;
};

export const getVoucher = ({ orderList, voucherUse }: totalItem) => {
  console.log(voucherUse.value);
  let totalItem = orderList?.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  if (voucherUse.value !== 0) {
    console.log(totalItem);
    totalItem = (totalItem * voucherUse.value) / 100;
    console.log(totalItem);
    return totalItem;
  }
  return 0;
};

export const getOrderTaxes = (orderList: OrderListDTO[]): number => {
  const subTotal = orderList?.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const taxes = (subTotal * 10) / 100; //taxes 10%//
  return taxes;
};

export const getOrderTotal = ({ orderList, voucherUse }: totalItem): number => {
  let subTotal = orderList?.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  if (voucherUse.value !== 0) {
    subTotal = (subTotal * voucherUse.value) / 100;
  }
  const taxes = (subTotal * 10) / 100; //taxes 10%//
  const total = subTotal + taxes;
  return total;
};

export const postOrderList = createAsyncThunk(
  'orderList/postOrderList',
  async (value: OrderListDTO) => {
    return await apiJsonServer.post(`/order-list`, value);
  }
);

export const updateOrderList = createAsyncThunk(
  'orderList/updateOrderList',
  async (updatedValue: OrderListDTO) => {
    return await apiJsonServer.put(
      `/order-list/${updatedValue.id}`,
      updatedValue
    );
  }
);

export const deleteOrderList = createAsyncThunk(
  'orderList/deleteOrderList',
  async (id: string) => {
    try {
      const res = await apiJsonServer.delete(`/order-list/${id}`);
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
        const totalOrder = {
          orderList: state.orderList,
          voucherUse: state.voucherUse,
        };
        state.voucherValue = getVoucher(totalOrder);
        state.subTotal = getOrderSubTotal(state.orderList);
        state.totalItem = getOrderTotalItem(state.orderList);
        state.taxes = getOrderTaxes(state.orderList);
        state.total = getOrderTotal(totalOrder);
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
    builder.addCase(fetchVoucherOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchVoucherOrder.fulfilled,
      (state, action: PayloadAction<VoucherDTO>) => {
        state.loading = false;
        state.voucherUse = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchVoucherOrder.rejected, (state, action) => {
      state.loading = false;
      state.voucherUse = <VoucherDTO>{};
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default OrderListSlice.reducer;
