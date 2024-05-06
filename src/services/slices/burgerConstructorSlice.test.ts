import { expect, test, describe } from '@jest/globals';
import burgerConstructorSlice, { addIngredient, deleteIngredient, updownIngredients, initialState } from './burgerConstructorSlice';

const mockIngredient = {
    ...initialState,
    bun: null,
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
describe('Тест burgerConstructorSlice, добавления и удаления ингредиентов', () => {
    test('Тест addIngredient', () => {
        const initialIngredient = {
            calories: 14,
            carbohydrates: 11,
            fat: 22,
            id: '123new',
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            name: 'Соус фирменный Space Sauce',
            price: 80,
            proteins: 50,
            type: 'sauce',
            __v: 0,
            _id: '643d69a5c3f7b9001cfa0943'
        };
        const newState = burgerConstructorSlice(mockIngredient, addIngredient(initialIngredient));
        const newIngredientId = newState.constructorItems.ingredients[newState.constructorItems.ingredients.length - 1].id;
        expect(newState.constructorItems.ingredients).toEqual([
            ...mockIngredient.constructorItems.ingredients,
            {
                ...initialIngredient,
                id: newIngredientId
            }
        ]);
    });

    test('Тест deleteIngredient', () => {
        const ingredientIdToDelete = '123-2';
        const action = deleteIngredient(ingredientIdToDelete);
        const newState = burgerConstructorSlice(mockIngredient, action);
        const expectedIngredients = mockIngredient.constructorItems.ingredients.filter(item => item.id !== ingredientIdToDelete);

        expect(newState.constructorItems.ingredients).toEqual(expectedIngredients);
    });
})
describe('Тест updownIngredients', () => {

    const initialIndex = 1;
    const moveUpAction = updownIngredients({ index: initialIndex, move: 'up' });
    const moveDownAction = updownIngredients({ index: initialIndex, move: 'down' });

    test('Проверка перемещения ингредиента вверх', () => {
        const newStateAfterMoveUp = burgerConstructorSlice(mockIngredient, moveUpAction);
        expect(newStateAfterMoveUp.constructorItems.ingredients[initialIndex - 1]).toEqual(mockIngredient.constructorItems.ingredients[initialIndex]);
        expect(newStateAfterMoveUp.constructorItems.ingredients[initialIndex]).toEqual(mockIngredient.constructorItems.ingredients[initialIndex - 1]);
    });

    test('Проверка перемещения ингредиента вниз', () => {
        const newStateAfterMoveDown = burgerConstructorSlice(mockIngredient, moveDownAction);
        expect(newStateAfterMoveDown.constructorItems.ingredients[initialIndex + 1]).toEqual(mockIngredient.constructorItems.ingredients[initialIndex]);
        expect(newStateAfterMoveDown.constructorItems.ingredients[initialIndex]).toEqual(mockIngredient.constructorItems.ingredients[initialIndex + 1]);
    });
})
