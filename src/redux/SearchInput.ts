import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  searchActive: boolean;
}

const initialState: ModalState = {
  searchActive: false,
};

export const SearchActiveSlice = createSlice({
  name: "searchActive",
  initialState,
  reducers: {
    searchActiveToogle: (state) => {
      state.searchActive = !state.searchActive;
    },
    searchActiveFalse: (state) => {
      state.searchActive = false;
    },
    searchActiveTrue: (state) => {
      state.searchActive = true;
    },
  },
});

export const { searchActiveToogle, searchActiveFalse, searchActiveTrue } =
  SearchActiveSlice.actions;

export default SearchActiveSlice.reducer;
