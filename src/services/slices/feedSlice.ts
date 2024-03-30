import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeedsApi } from '../actions';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFeedsApi.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeedsApi.rejected, (state) => {
        state.orders = [];
        state.total = 0;
        state.totalToday = 0;
      });
  }
});

export default feedSlice.reducer;
