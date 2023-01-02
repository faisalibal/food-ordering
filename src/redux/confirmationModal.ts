import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  confirmationModal: boolean;
}

const initialState: ModalState = {
  confirmationModal: false,
};

export const ConfirmationModalSlice = createSlice({
  name: "confirmationModal",
  initialState,
  reducers: {
    confirmationModalToogle: (state) => {
      state.confirmationModal = !state.confirmationModal;
    },
    confirmationModalModalFalse: (state) => {
      state.confirmationModal = false;
    },
    confirmationModalTrue: (state) => {
      state.confirmationModal = true;
    },
  },
});

export const {
  confirmationModalToogle,
  confirmationModalModalFalse,
  confirmationModalTrue,
} = ConfirmationModalSlice.actions;

export default ConfirmationModalSlice.reducer;
