import React, { useEffect } from 'react';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import { NavbarWaiters } from '../../components/navbar/NavbarWaiters';
import { WaitersOrderCard } from '../../components/card/order-card/OrderCard';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchOrderGuest } from '../../redux/OrderListSlice';
import { GuestDTO } from '../../DTO/OrderListDTO';
import { fetchWaitersOrderItem } from '../../redux/WaitersSlice';

const WaiterAllOrder = () => {
  const { waitersOrderItem } = useAppSelector((state) => ({
    ...state.waitersOrder,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchWaitersOrderItem());
  }, []);
  return (
    <div className="home-container mb-4 pb-[200px]">
      <HeaderNav setSearch={() => {}} />
      <NavbarWaiters />
      {waitersOrderItem?.length === 0 ? (
        <div className="grid place-items-center h-[74vh]">
          <p className="font-semibold">No orders today</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {waitersOrderItem?.map((item, index) => (
            <WaitersOrderCard orderList={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WaiterAllOrder;
