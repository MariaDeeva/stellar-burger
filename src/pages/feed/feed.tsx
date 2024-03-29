import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { fetchFeedsApi } from '../../utils/constants';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector((state) => state.feed.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeedsApi())
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  <FeedUI orders={orders} handleGetFeeds={() =>dispatch(fetchFeedsApi())} />;
};
