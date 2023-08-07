import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { baseURL } from '../config/axios';
import { FoodDTO } from '../DTO/FoodDTO';
import { ReservationDto } from '../DTO/ReservationDTO';

export type initialStates = {
  loading: boolean;
  reservationData: ReservationDto[];
  error: string;
};

const initialState: initialStates = {
  loading: false,
  reservationData: [],
  error: '',
};

export const fetchReservation = createAsyncThunk(
  'reservation/fetchReservation',
  async () => {
    try {
      const res = await baseURL.get('/reservations');
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postReservation = createAsyncThunk(
  'reservation/postReservation',
  async (value: ReservationDto) => {
    return await baseURL.post(`/reservations`, value);
  }
);

export const deleteReservation = createAsyncThunk(
  'reservation/deleteReservation',
  async (id: number) => {
    try {
      const res = await baseURL.delete(`/reservations/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const FavouriteSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchReservation.fulfilled,
      (state, action: PayloadAction<ReservationDto[]>) => {
        state.loading = false;
        state.reservationData = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchReservation.rejected, (state, action) => {
      state.loading = false;
      state.reservationData = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(postReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postReservation.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(postReservation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(deleteReservation.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteReservation.fulfilled, (state, action) => {
      state.loading = false;
      state.error = '';
    });
    builder.addCase(deleteReservation.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default FavouriteSlice.reducer;
