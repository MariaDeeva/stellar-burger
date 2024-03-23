import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
})