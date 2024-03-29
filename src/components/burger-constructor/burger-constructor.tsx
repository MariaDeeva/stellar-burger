import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { closeOrderNumberModal } from '../../services/slices/orderSlice'
import { fetchOrderBurgerApi } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { constructorItems } = useSelector((state) => state.burgerConstructor);
  const userAuth = useSelector((state) => state.user.user);
  const orderRequest = useSelector((state) => state.order.orderRequest);

  const orderModalData = useSelector((state) => state.order.orderModalData);

  let orderData: string[] = [];

  const onOrderClick = () => {
    if (!userAuth) {
      navigate('/login');
      return;
    } else if (!constructorItems.bun || orderRequest) {
      const ingredientsIds = constructorItems.ingredients.map(ingredient => ingredient._id);
      dispatch(fetchOrderBurgerApi(ingredientsIds));
      return;
    }
  };

  useEffect(() => {
    if (constructorItems.bun && constructorItems.ingredients) {
      orderData = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ing) => ing._id),
        constructorItems.bun._id
      ];
    }
  }, [constructorItems]);

console.log(orderRequest);
  const closeOrderModal = () => {
    dispatch(closeOrderNumberModal());
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
