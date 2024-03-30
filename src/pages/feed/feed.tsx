import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeedsApi } from '../../utils/constants';

export const Feed: FC = () => {
 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeedsApi())
  }, []);
  
  const orders: TOrder[] = useSelector((state) => state.feed.orders);
  console.log(orders);
  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeedsApi())} />;
};
