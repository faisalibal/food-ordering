import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseURL } from '../config/axios';
import { VoucherDTO } from '../DTO/VoucherDTO';

export type initialStates = {
  loading: boolean;
  voucher: VoucherDTO[];
  voucherWantUse: VoucherDTO;
  error: string;
};

const initialState: initialStates = {
  loading: false,
  voucher: [],
  voucherWantUse: <VoucherDTO>{},
  error: '',
};

export const fetchVoucher = createAsyncThunk(
  'voucher/fetchVoucher',
  async () => {
    try {
      const res = await baseURL.get('/vouchers');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchVoucherId = createAsyncThunk(
  'vouchers/fetchVoucherId',
  async (id: string) => {
    try {
      const res = await baseURL.get(`/vouchers/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const VoucherSlice = createSlice({
  name: 'voucher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVoucher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchVoucher.fulfilled,
      (state, action: PayloadAction<VoucherDTO[]>) => {
        state.loading = false;
        state.voucher = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchVoucher.rejected, (state, action) => {
      state.loading = false;
      state.voucher = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchVoucherId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchVoucherId.fulfilled,
      (state, action: PayloadAction<VoucherDTO>) => {
        state.loading = false;
        state.voucherWantUse = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchVoucherId.rejected, (state, action) => {
      state.loading = false;
      state.voucherWantUse = <VoucherDTO>{};
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default VoucherSlice.reducer;
