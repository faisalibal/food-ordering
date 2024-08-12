import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  voucherModal: boolean;
}

const initialState: ModalState = {
  voucherModal: false,
};

export const VoucherModalSlice = createSlice({
  name: "voucherModal",
  initialState,
  reducers: {
    voucherModalToogle: (state) => {
      state.voucherModal = !state.voucherModal;
    },
    voucherModalModalFalse: (state) => {
      state.voucherModal = false;
    },
    voucherModalTrue: (state) => {
      state.voucherModal = true;
    },
  },
});

export const { voucherModalToogle, voucherModalModalFalse, voucherModalTrue } =
  VoucherModalSlice.actions;

export default VoucherModalSlice.reducer;
