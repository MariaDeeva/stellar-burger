import { expect, test, describe } from '@jest/globals';
import orderSlice, { initialState } from './orderSlice';
import { fetchOrderApi, fetchOrderBurgerApi } from '../actions';

describe('Тест orderSlice',()=>{
    const mockOrder = {
        orders: [
            {
                createdAt: "2024-04-28T19:04:49.880Z",
                ingredients: [
                    '643d69a5c3f7b9001cfa093d',
                    '643d69a5c3f7b9001cfa0947',
                    '643d69a5c3f7b9001cfa0947',
                    '643d69a5c3f7b9001cfa093d'],
                name: "Флюоресцентный фалленианский бургер",
                number: 38903,
                status: "done",
                updatedAt: "2024-04-28T19:04:50.511Z",
                _id: "662e9dd197ede0001d067f36"
            },
            {
                createdAt: "2024-04-26T11:28:58.868Z",
                ingredients: ['643d69a5c3f7b9001cfa093c',
                    '643d69a5c3f7b9001cfa0940',
                    '643d69a5c3f7b9001cfa0940',
                    '643d69a5c3f7b9001cfa093c'],
                name: "Краторный метеоритный бургер",
                number: 38854,
                status: "done",
                updatedAt: "2024-04-26T11:28:59.550Z",
                _id: "662b8ffa97ede0001d067b24",
            }
        ]
    };

    test('Тест fetchOrderBurgerApi pending',()=>{
        const action = {
            type: fetchOrderBurgerApi.pending.type,
        }
        const expectState={
            ...initialState,
            orderRequest: true
        }
        const newState = orderSlice(initialState,action);
        expect(newState).toEqual(expectState);
    });

    test('Тест fetchOrderBurgerApi rejected',()=>{
        const action = {
            type: fetchOrderBurgerApi.rejected.type,
        }
        const expectState={
            ...initialState,
            orderRequest: false
        }
        const newState = orderSlice(initialState,action);
        expect(newState).toEqual(expectState);
    });

    test('Тест fetchOrderBurgerApi fulfilled',()=>{
        const action = {
            type: fetchOrderBurgerApi.fulfilled.type,
            payload: mockOrder
        }
        const expectState={
            ...initialState,
            orderRequest: false,
            orderModalData: mockOrder
        }
        const newState = orderSlice(initialState,action);
        expect(newState).toEqual(expectState);
    });

    test('Тест fetchOrderApi fulfilled',()=>{
        const action = {
            type: fetchOrderApi.fulfilled.type,
            payload: mockOrder
        }
        const expectState={
            ...initialState,
            orders: mockOrder
        }
        const newState = orderSlice(initialState,action);
        expect(newState).toEqual(expectState);
    });
})