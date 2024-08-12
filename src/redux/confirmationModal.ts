import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModalState {
  confirmationModal: boolean;
  errorMessage: string;
  errorModal: boolean;
}

const initialState: ModalState = {
  confirmationModal: false,
  errorMessage: '',
  errorModal: false,
};

export const ConfirmationModalSlice = createSlice({
  name: 'confirmationModal',
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
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setErrorModalTrue: (state) => {
      state.errorModal = true;
    },
    setErrorModalFalse: (state) => {
      state.errorModal = false;
    },
  },
});

export const {
  confirmationModalToogle,
  confirmationModalModalFalse,
  confirmationModalTrue,
  setErrorMessage,
  setErrorModalFalse,
  setErrorModalTrue,
} = ConfirmationModalSlice.actions;

export default ConfirmationModalSlice.reducer;
