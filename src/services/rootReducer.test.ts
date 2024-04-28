import { expect, test, describe } from '@jest/globals';
import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import burgerReducer from './slices/burgerConstructorSlice';
import userReducer from './slices/userSlice';
import feedReducer from './slices/feedSlice';
import orderReducer from './slices/orderSlice';
import { rootReducer } from './rootReducer';
import store from './store';

describe('Тест rootReducer', ()=>{
    const testRootReducer = {
        ingredients: ingredientsReducer,
        burgering: burgerReducer,
        user: userReducer,
        feed: feedReducer,
        order: orderReducer
    };
    test('Настройка работы rootReducer', ()=>{
        const action = { type: 'UNKNOWN_ACTION' };
        const newState = rootReducer(undefined, action);
        expect(store.getState()).toEqual(newState);
    })
})