import { configureStore } from "@reduxjs/toolkit";
import foodReducer from "./FoodSlice";
import orderListReducer from "./OrderListSlice";
import addModalChartReducer from "./AddChartModal";
import voucherModalReducer from "./VoucherModal";
import favouriteReducer from "./favouriteSlice";
import confirmationReducer from "./confirmationModal";
import bookingConfirmationReducer from "./bookingConfirmation";
import reservationReducer from "./reservationSlice";
import modalTableReducer from "./ModalTable";

const store = configureStore({
  reducer: {
    food: foodReducer,
    orderList: orderListReducer,
    addModalChart: addModalChartReducer,
    voucherModal: voucherModalReducer,
    favourite: favouriteReducer,
    confirmation: confirmationReducer,
    bookingConfirmation: bookingConfirmationReducer,
    reservation: reservationReducer,
    modalTable: modalTableReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
