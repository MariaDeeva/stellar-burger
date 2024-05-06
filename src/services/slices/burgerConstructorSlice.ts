import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

type TBurgerConstructorState = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

export const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const newIngredient = { ...action.payload, id: uuidv4() };
      if (newIngredient.type === 'bun') {
        state.constructorItems.bun = newIngredient;
      } else {
        state.constructorItems.ingredients.push(newIngredient);
      }
    },
    deleteIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload
        );
    },
    resetIngredients: (state) => {
      state.constructorItems.bun = null;
      state.constructorItems.ingredients = [];
    },
    updownIngredients: (state, action) => {
      const { index, move } = action.payload;
      const { ingredients } = state.constructorItems;
      if (move === 'up' && index > 0) {
        [ingredients[index - 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index - 1]
        ];
      } else if (move === 'down' && index < ingredients.length - 1) {
        [ingredients[index + 1], ingredients[index]] = [
          ingredients[index],
          ingredients[index + 1]
        ];
      }
    }
  }
});

export const {
  addIngredient,
  deleteIngredient,
  resetIngredients,
  updownIngredients
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;
