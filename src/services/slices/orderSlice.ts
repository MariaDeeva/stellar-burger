import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderBurgerApi } from '../../utils/constants';
import { TOrder } from '@utils-types';

type TOrderState = {

    orderRequest: boolean;
    orderModalData: TOrder | null;
}

const initialState: TOrderState = {

    orderRequest: false,
    orderModalData: null
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        closeOrderNumberModal: (state) => {
            state.orderRequest = false;
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
    },
});

export default orderSlice.reducer;
export const { closeOrderNumberModal } = orderSlice.actions;