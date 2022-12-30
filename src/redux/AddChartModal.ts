import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FoodDTO } from "../DTO/FoodDTO";

export interface ModalState {
  addChartModal: boolean;
}

const initialState: ModalState = {
  addChartModal: false,
};

export const AddChartModalSlice = createSlice({
  name: "addChartModal",
  initialState,
  reducers: {
    addChartModalToogle: (state) => {
      state.addChartModal = !state.addChartModal;
    },
    addChartModalFalse: (state) => {
      state.addChartModal = false;
    },
    addChartModalTrue: (state) => {
      state.addChartModal = true;
    },
  },
});

export const { addChartModalToogle, addChartModalFalse, addChartModalTrue } =
  AddChartModalSlice.actions;

export default AddChartModalSlice.reducer;
