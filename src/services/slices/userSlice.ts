import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUser, logout, registerUser, updateUser } from '../../utils/constants';

type TUserState = {
    user: TUser | null,
    isAuthChecked: boolean
}

const initialState: TUserState = {
    user: null,
    isAuthChecked: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser: (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
      },
      setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
        state.isAuthChecked = action.payload;
      }
    },
    extraReducers(builder) {
        builder
            .addCase(loginUser.pending, (state) => {
                state.isAuthChecked = true;
            })
            .addCase(loginUser.rejected, (state) => {
                state.isAuthChecked = false;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthChecked = true;
                state.user = action.payload;
            });
        builder
            .addCase(registerUser.pending, (state) => {
                state.isAuthChecked = true;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isAuthChecked = false;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthChecked = true;
                state.user = action.payload;
            });
        builder
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            });
        builder
            .addCase(updateUser.fulfilled, (state, action) => {
                state.user = action.payload;
            });
        }
});


export default userSlice.reducer;
export const { setUser, setIsAuthChecked } = userSlice.actions;