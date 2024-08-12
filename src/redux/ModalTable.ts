import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  modalTable: boolean;
}

const initialState: ModalState = {
  modalTable: false,
};

export const ModalTableSlice = createSlice({
  name: "modalTable",
  initialState,
  reducers: {
    modalTableToogle: (state) => {
      state.modalTable = !state.modalTable;
    },
    modalTableFalse: (state) => {
      state.modalTable = false;
    },
    modalTableTrue: (state) => {
      state.modalTable = true;
    },
  },
});

export const { modalTableToogle, modalTableFalse, modalTableTrue } =
  ModalTableSlice.actions;

export default ModalTableSlice.reducer;
