
import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeedsApi } from '../../utils/constants';

type TFeedState={
    order: TOrder[],
    total:number,
    totalToday:number
}

const initialState:TFeedState={
    order:[],
    total: 0,
    totalToday:0
}

const feedSlice = createSlice({
    name:'feed',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(fetchFeedsApi.fulfilled,(state,action)=>{
            state.order= action.payload.orders;
            state.total=action.payload.total;
            state.totalToday=action.payload.totalToday;
        })
    },
})

export default feedSlice.reducer;