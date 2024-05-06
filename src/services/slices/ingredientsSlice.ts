import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredientApi } from '../actions';

type TIngredientState = {
  ingredients: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  loading: false,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  selectors: {},
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchIngredientApi.pending, (state) => {
        (state.error = null), (state.loading = true);
      })
      .addCase(fetchIngredientApi.fulfilled, (state, action) => {
        (state.ingredients = action.payload), (state.loading = false);
      })
      .addCase(fetchIngredientApi.rejected, (state, action) => {
        (state.error = action.error.message || null), (state.loading = true);
      });
  }
});

export default ingredientsSlice.reducer;
