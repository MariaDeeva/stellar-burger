import { TIngredient, TUser } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie } from '../utils/cookie';
import { getIngredientsApi, 
  getFeedsApi, 
  orderBurgerApi, 
  getUserApi, 
  logoutApi, 
  loginUserApi, 
  updateUserApi, 
  registerUserApi, 
  TRegisterData, 
  TLoginData, 
  getOrdersApi 
} from '@api';
import { setUser, setIsAuthChecked } from '../services/slices/userSlice';
//Ингредиенты
export const fetchIngredientApi = createAsyncThunk('ingredients/fetch', getIngredientsApi);

//Лента заказов
export const fetchFeedsApi = createAsyncThunk('order/fetch', getFeedsApi);

//Заказ
export const fetchOrderBurgerApi = createAsyncThunk('order/fetchOrderBurger',
  async (data: string[]) => {
    const res = await orderBurgerApi(data);
    return res.order;
  });
export const fetchOrderApi = createAsyncThunk('order/fetchOrder', getOrdersApi);

//Пользователи
export const logout = createAsyncThunk(
  'user/logout',
  async () => {
    await logoutApi();
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }: TLoginData): Promise<TUser> => {
    const data = await loginUserApi({ email, password });
    return data.user;
  }
);
export const updateUser = createAsyncThunk(
  'user/update',
  async ({ name, email, password }: TRegisterData) => {
    const data = await updateUserApi({ name, email, password });
    return data.user;
  }
);
export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }: TRegisterData) => {
    const data = await registerUserApi({ name, email, password });
    return data.user;
  }
);


//Проверка аутификации пользователя
export const checkUser = createAsyncThunk(
  'user/checkUser',
  async (_, { dispatch }): Promise<void> => {
    if (getCookie('accessToken')) {
      getUserApi()
        .then((res) => dispatch(setUser(res.user)))
        .catch((): void => {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        })
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);


