import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const fetchIngredientApi = createAsyncThunk('ingredients/fetch', getIngredientsApi);

export function filterIngredients(ingredients: TIngredient[], type: string):
 TIngredient[] {
  return ingredients.filter((item) => item.type === type);
}
