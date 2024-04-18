import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { fetchOrderApi } from '../../services/actions';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.order.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderApi());
  });
  return <ProfileOrdersUI orders={orders} />;
};
