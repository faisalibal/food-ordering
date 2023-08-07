import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../config/axios';
import { FoodDTO } from '../DTO/FoodDTO';

export type initialStates = {
  loading: boolean;
  food: FoodDTO[];
  foodId: FoodDTO;
  error: string;
};

const initialState: initialStates = {
  loading: false,
  food: [],
  foodId: <FoodDTO>{},
  error: '',
};

export const fetchFood = createAsyncThunk('food/fetchFood', async () => {
  try {
    const res = await baseURL.get('/foods');
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchFoodId = createAsyncThunk(
  'food/fetchFoodId',
  async (id: number) => {
    try {
      const res = await baseURL.get(`/foods/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const FoodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFood.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchFood.fulfilled,
      (state, action: PayloadAction<FoodDTO[]>) => {
        state.loading = false;
        state.food = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchFood.rejected, (state, action) => {
      state.loading = false;
      state.food = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(fetchFoodId.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchFoodId.fulfilled,
      (state, action: PayloadAction<FoodDTO>) => {
        state.loading = false;
        state.foodId = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchFoodId.rejected, (state, action) => {
      state.loading = false;
      state.foodId = <FoodDTO>{};
      state.error = action.error.message || 'Something went wrong';
    });
  },
});

export default FoodSlice.reducer;
