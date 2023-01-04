import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
  bookingConfirmationModal: boolean;
}

const initialState: ModalState = {
  bookingConfirmationModal: false,
};

export const BookingConfirmationModalSlice = createSlice({
  name: "bookingConfirmationModal",
  initialState,
  reducers: {
    bookingConfirmationModalToogle: (state) => {
      state.bookingConfirmationModal = !state.bookingConfirmationModal;
    },
    bookingConfirmationModalFalse: (state) => {
      state.bookingConfirmationModal = false;
    },
    bookingConfirmationModalTrue: (state) => {
      state.bookingConfirmationModal = true;
    },
  },
});

export const {
  bookingConfirmationModalToogle,
  bookingConfirmationModalFalse,
  bookingConfirmationModalTrue,
} = BookingConfirmationModalSlice.actions;

export default BookingConfirmationModalSlice.reducer;
