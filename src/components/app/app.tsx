import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { OnlyAuth, OnlyUnAuth, } from '../protected-route/ProtectedRoute';
import { useDispatch } from '../../services/store';
import { useEffect } from 'react';
import { fetchIngredientApi, checkUser } from '../../utils/constants';

const App = () => {

  const navigate = useNavigate();
  const handleCloseNavigate = () => {
    navigate(-1);
  }

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIngredientApi());
    dispatch(checkUser());
  }, []);


  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login'
          element={<OnlyUnAuth component={<Login />} />}
        />
        <Route path='/register'
          element={<OnlyUnAuth component={<Register />} />}
        />
        <Route path='/forgot-password'
          element={<OnlyUnAuth component={<ForgotPassword />} />}
        />
        <Route path='/reset-password'
          element={<OnlyUnAuth component={<ResetPassword />} />}
        />
        <Route path='/profile'
          element={<OnlyAuth component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<OnlyAuth component={<ProfileOrders />} />}
        />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id'
          element={
            <Modal
              title={''}
              onClose={handleCloseNavigate}>
              <IngredientDetails />
            </Modal>}
        />
        <Route path='/profile/orders/:number'
          element={
            <Modal
              title={''}
              onClose={handleCloseNavigate}>
              <OnlyAuth component={<OrderInfo />} />
            </Modal>}
        />
      </Routes>
    </div>
  );
};
export default App;
