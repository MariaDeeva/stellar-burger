import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderApi, fetchOrderBurgerApi } from '../actions';
import { TOrder } from '@utils-types';

type TOrderState = {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TOrderState = {
  orders: [],
  orderRequest: false,
  orderModalData: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeOrder: (state) => {
      state.orderRequest = false;
      state.orderModalData = null;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOrderBurgerApi.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrderBurgerApi.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrderBurgerApi.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      });
    builder.addCase(fetchOrderApi.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

export default orderSlice.reducer;
export const { closeOrder } = orderSlice.actions;
