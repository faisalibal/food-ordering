import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { apiJsonServer } from "../config/axios";
import { CategoriesDTO } from "../DTO/CategoriesDTO";

export type initialStates = {
  loading: boolean;
  category: CategoriesDTO[];
  error: string;
};

const initialState: initialStates = {
  loading: false,
  category: [],
  error: "",
};

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async () => {
    try {
      const res = await apiJsonServer.get("/category");
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const FavouriteSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCategory.fulfilled,
      (state, action: PayloadAction<CategoriesDTO[]>) => {
        state.loading = false;
        state.category = action.payload;
        state.error = "";
      }
    );
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false;
      state.category = [];
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default FavouriteSlice.reducer;
