import { expect, test, describe } from '@jest/globals';
import feedSlice, { initialState } from './feedSlice';
import { fetchFeedsApi } from '../actions';

describe('Тест feedSlice', () => {
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
        ],
        total: 2,
        totalToday: 2
    };

    test('Тест экшена  fulfilled', () => {
        const action = {
            type: fetchFeedsApi.fulfilled.type,
            payload: mockOrder,
        }
        const expectState = {
            ...initialState,
            orders: mockOrder.orders,
            total: mockOrder.total,
            totalToday: mockOrder.totalToday
        }
        const newState = feedSlice(initialState, action);
        expect(newState).toEqual(expectState);
    });

    test('Тест экшена rejected', () => {
        const action = {
            type: fetchFeedsApi.rejected.type
        }
        const expectState = {
            ...initialState,
            orders: [],
            total: 0,
            totalToday: 0,
        };
        const newState = feedSlice(initialState, action);
        expect(newState).toEqual(expectState);
    });
});