import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseURL } from '../config/axios';
import { OrderDTO } from '../DTO/OrderListDTO';

export type initialStates = {
  chefList: OrderDTO[];
  chefwork: OrderDTO[];
  loading: boolean;
  error: string;
};

const initialState: initialStates = {
  chefList: [],
  chefwork: [],
  loading: false,
  error: '',
};

export const fetchChefOrderWork = createAsyncThunk(
  'orderWaiters/fetchWaitersOrderWork',
  async () => {
    try {
      const res = await baseURL.get('/orders/chef/orders/work');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchChefOrder = createAsyncThunk(
  'orderWaiters/fetchWaitersOrder',
  async () => {
    try {
      const res = await baseURL.get('/orders/chef/orders');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const ChefSlice = createSlice({
  name: 'order-list',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChefOrder.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchChefOrder.fulfilled,
      (state, action: PayloadAction<OrderDTO[]>) => {
        state.loading = false;
        state.chefList = action.payload;
      }
    );
    builder.addCase(fetchChefOrder.rejected, (state, action) => {
      state.loading = false;
      state.chefList = [];
      state.error = action.error.message || 'Something went wrong';
    });

    builder.addCase(fetchChefOrderWork.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchChefOrderWork.fulfilled,
      (state, action: PayloadAction<OrderDTO[]>) => {
        state.loading = false;
        state.chefwork = action.payload;
      }
    );
    builder.addCase(fetchChefOrderWork.rejected, (state, action) => {
      state.loading = false;
      state.chefwork = [];
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default ChefSlice.reducer;
