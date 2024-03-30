import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { closeOrder } from '../../services/slices/orderSlice';
import { fetchOrderBurgerApi } from '../../services/actions';
import { useNavigate } from 'react-router-dom';
import { resetIngredients } from '../../services/slices/burgerConstructorSlice';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems } = useSelector((state) => state.burgerConstructor);
  const userAuth = useSelector((state) => state.user.user);
  const orderRequest = useSelector((state) => state.order.orderRequest);

  const orderModalData = useSelector((state) => state.order.orderModalData);
  const onOrderClick = () => {
    if (!userAuth) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    const dataOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];
    dispatch(fetchOrderBurgerApi(dataOrder));
  };

  const closeOrderModal = () => {
    dispatch(closeOrder());
    dispatch(resetIngredients());
    navigate('/');
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
