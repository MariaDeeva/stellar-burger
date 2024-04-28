import { expect, test, describe } from '@jest/globals';
import ingredientsSlice, { initialState } from './ingredientsSlice';
import { fetchIngredientApi } from '../actions';

describe('Тест ingredientsSlice', () => {
    const mockIngredients = {
        ...initialState,
        ingredients: [
            {
                calories: 30,
                carbohydrates: 40,
                fat: 20,
                id: '123-2',
                image: 'https://code.s3.yandex.net/react/code/sauce-02.pn',
                image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
                name: 'Соус Spicy-X',
                price: 90,
                proteins: 30,
                type: 'sauce',
                __v: 0,
                _id: '643d69a5c3f7b9001cfa0942"'
            },
            {
                calories: 643,
                carbohydrates: 85,
                fat: 26,
                id: '123-3',
                image: 'https://code.s3.yandex.net/react/code/bun-01.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
                name: 'Флюоресцентная булка R2-D3',
                price: 988,
                proteins: 44,
                type: 'bun',
                __v: 0,
                _id: '643d69a5c3f7b9001cfa093d'
            },
            {
                calories: 6,
                carbohydrates: 3,
                fat: 2,
                id: '123-1',
                image: 'https://code.s3.yandex.net/react/code/salad.png',
                image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
                image_mobile:
                    'https://code.s3.yandex.net/react/code/salad-mobile.png',
                name: 'Мини-салат Экзо-Плантаго',
                price: 4400,
                proteins: 1,
                type: 'main',
                __v: 0,
                _id: '643d69a5c3f7b9001cfa0949'
            }]
    };

    test('Тест экшена pending', () => {
        const action = {
            type: fetchIngredientApi.pending.type
        }
        const expectedState = {
            ...initialState,
            loading: true,
            error: null
        };
        const newState = ingredientsSlice(initialState, action);
        expect(newState).toEqual(expectedState);
    });

    test ('Тест экшена fulfilled',()=>{
        const action = {
            type: fetchIngredientApi.fulfilled.type,
            payload: mockIngredients
        }
        const expectState = {
            ...initialState,
            ingredients: mockIngredients,
            loading: false
          };
        const newState = ingredientsSlice(initialState, action);
        expect(newState).toEqual(expectState);
    });

    test ('Тест экшена rejected',()=>{
        const error = { message: 'Test error' };
        const action = {
            type: fetchIngredientApi.rejected.type,
            error
        }
        const expectState = {
            ...initialState,
            error: error.message,
            loading: true
          };
        const newState = ingredientsSlice(initialState, action);
        expect(newState).toEqual(expectState);
    });
});