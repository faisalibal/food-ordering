import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodDTO } from '../DTO/FoodDTO';
import { ItemOrderDTO } from '../DTO/OrderListDTO';

export interface ModalState {
  addChartModal: boolean;
  waitersModalItem: boolean;
  waiterItem: ItemOrderDTO[];
  tableNo: number;
  waitersDrawer: boolean;
  waiterOrderId: number;
}

const initialState: ModalState = {
  addChartModal: false,
  waiterItem: [],
  waitersModalItem: false,
  tableNo: 0,
  waitersDrawer: false,
  waiterOrderId: 0,
};

export const AddChartModalSlice = createSlice({
  name: 'addChartModal',
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
    addWaitersModalItemToogle: (state) => {
      state.waitersModalItem = !state.addChartModal;
    },
    addWaitersModalItemFalse: (state) => {
      state.waitersModalItem = false;
    },
    addWaitersModalItemTrue: (state) => {
      state.waitersModalItem = true;
    },
    addWaitersDrawerItemFalse: (state) => {
      state.waitersDrawer = false;
    },
    // addWaitersDrawerItemTrue: (state, action) => {
    //   state.waitersDrawer = true;
    //   state.waiterItem = action.payload.item;
    //   state.tableNo = action.payload.tableNo;
    // },
    addWaitersDrawerItemTrue: (state, action) => {
      state.waitersDrawer = true;
      state.waiterOrderId = action.payload;
    },
  },
});

export const {
  addChartModalToogle,
  addChartModalFalse,
  addChartModalTrue,
  addWaitersModalItemFalse,
  addWaitersModalItemToogle,
  addWaitersModalItemTrue,
  addWaitersDrawerItemFalse,
  addWaitersDrawerItemTrue,
} = AddChartModalSlice.actions;

export default AddChartModalSlice.reducer;
