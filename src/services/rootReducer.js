import { combineReducers } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredientsSlice';
import burgerConstructorSlice from './slices/burgerConstructorSlice';

export const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    burgerConstructor: burgerConstructorSlice
})