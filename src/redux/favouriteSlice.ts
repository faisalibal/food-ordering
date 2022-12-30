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

// export const fetchFoodId = createAsyncThunk(
//   "food/fetchFoodId",
//   async (id: string) => {
//     try {
//       const res = await apiJsonServer.get(`/food/${id}`);
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

const FavouriteSlice = createSlice({
  name: "food",
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
  },
});

export default FavouriteSlice.reducer;
