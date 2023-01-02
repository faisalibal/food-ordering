import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiJsonServer } from "../config/axios";
import { FoodDTO } from "../DTO/FoodDTO";

export type initialStates = {
  loading: boolean;
  favourite: FoodDTO[];
  error: string;
};

const initialState: initialStates = {
  loading: false,
  favourite: [],
  error: "",
};

export const fetchFavourite = createAsyncThunk(
  "favourite/fetchFavourite",
  async () => {
    try {
      const res = await apiJsonServer.get("/favourite");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postFavourite = createAsyncThunk(
  "favourite/postFavourite",
  async (value: FoodDTO) => {
    return await apiJsonServer.post(`/favourite`, value);
  }
);

export const deleteFavourite = createAsyncThunk(
  "favourite/deleteFavourite",
  async (id: string) => {
    try {
      const res = await apiJsonServer.delete(`/favourite/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const FavouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFavourite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchFavourite.fulfilled,
      (state, action: PayloadAction<FoodDTO[]>) => {
        state.loading = false;
        state.favourite = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchFavourite.rejected, (state, action) => {
      state.loading = false;
      state.favourite = [];
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(postFavourite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postFavourite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(postFavourite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
    builder.addCase(deleteFavourite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteFavourite.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(deleteFavourite.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default FavouriteSlice.reducer;
