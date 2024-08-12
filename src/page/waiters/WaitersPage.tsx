import React, { useEffect, useState } from 'react';
import { NavbarWaiters } from '../../components/navbar/NavbarWaiters';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import eat from '../../assets/images/eat.png';
import './waiters.css';
import Cook from '../../assets/icons/cook';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchWaitersCall, fetchWaitersOrder } from '../../redux/WaitersSlice';
import { ItemOrderDTO, OrderDTO } from '../../DTO/OrderListDTO';
import { AnimatePresence } from 'framer-motion';
import ModalWaiters from '../../components/modal/modal-waiters/ModalWaiters';
import {
  addWaitersDrawerItemTrue,
  addWaitersModalItemFalse,
} from '../../redux/AddChartModal';
import { Modal } from 'rsuite';
import { fetchItemStatus } from '../../redux/OrderListSlice';
import WaitersLayout from '../../components/layout/WaitersLayout';
import { Flip, ToastContainer, toast } from 'react-toastify';
import { io } from 'socket.io-client';

const WaitersPage = () => {
  const { waitersOrderList, notif, waitersCall } = useAppSelector((state) => ({
    ...state.waitersOrder,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    const getData = async () => {
      await dispatch(fetchWaitersOrder());
      await dispatch(fetchItemStatus());
    };
    getData();
  }, []);

  useEffect(() => {
    dispatch(fetchWaitersCall());
    if (waitersCall.length > 0) {
      waiters();
    }
  }, [notif]);

  console.log(waitersOrderList, 'waiter orders');

  const waiters = () => {
    toast.error('Table no 2 call you', {
      position: 'top-center',
      autoClose: 10000,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      closeButton: true,
    });
  };

  type order = {
    item: OrderDTO;
    index: number;
  };

  type dataItem = {
    tableNo: number;
    item: ItemOrderDTO[] | undefined;
  };

  const CardOrder = ({ item, index }: order) => {
    const totalItem = item?.items.length;
    const itemDone = item?.items?.filter((item) => {
      return item.statusId === 5;
    });
    const percentage = (itemDone.length / totalItem) * 100;
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [dataItem, setDataItem] = useState<dataItem>();

    useEffect(() => {
      const startTime = new Date(item.createdAt);

      const interval = setInterval(() => {
        const currentTime = new Date();
        const updatedElapsedTime = currentTime.getTime() - startTime.getTime();

        setElapsedTime(updatedElapsedTime);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }, [item.createdAt]);

    useEffect(() => {
      setDataItem({
        tableNo: item.table.table_no,
        item: item.items,
      });
    }, [item.items]);
    // Mengubah elapsed time menjadi waktu dalam format yang diinginka
    const hours = Math.floor(elapsedTime / 3600000)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((elapsedTime % 3600000) / 60000)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((elapsedTime % 60000) / 1000)
      .toString()
      .padStart(2, '0');

    // console.log(waitersOrderList);
    return (
      <>
        <div
          className="flex flex-col gap-2 w-full border shadow-lg rounded-t-3xl rounded-bl-3xl items-center justify-between p-4 waiter-order-card relative "
          onClick={() => {
            dispatch(addWaitersDrawerItemTrue(item.id));
            console.log(item.id);
          }}
        >
          <div className="text-[50px] absolute text-white font-bold top-14 flex flex-col items-center">
            <p>{item?.table?.table_no}</p>
            <p className="text-[14px]">
              {hours}:{minutes}:{seconds}
            </p>
          </div>
          <div className="flex justify-between items-center w-full">
            <Cook />
            <div className="flex flex-col justify-end items-end ">
              <p
                className={`font-semibold  text-[30px] ${
                  percentage <= 50 ? 'text-red-400' : 'text-green-200'
                } `}
              >
                {percentage.toFixed(1)}%
              </p>
              <p className="text-[12px] font-medium text-white">
                {itemDone.length}/{totalItem} Items
              </p>
            </div>
          </div>
          <div className="flex w-full justify-between items-end">
            {item.guest && (
              <div>
                <p className="text-[14px] font-semibold text-white">
                  {item?.guest?.name}
                </p>
                <p className="text-[12px] text-white">
                  {item?.guest?.phone_number}
                </p>
                <p className="text-[11px] text-white">Guest</p>
              </div>
            )}
            {item.customer && (
              <div>
                <p className="text-[14px] font-semibold text-white">
                  {item.customer.customerName}
                </p>
                <p className="text-[12px] text-white">
                  {item.customer.phoneNumber}
                </p>
                <p className="text-[11px] text-white">Customer</p>
              </div>
            )}

            <div>
              <button className="px-2 py-0  rounded-md text-white">
                {item.orderStatus.status}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <WaitersLayout>
      <ToastContainer
        toastStyle={{
          borderRadius: '12px',
          width: '300px',
          fontSize: '16px',
          fontWeight: 500,
        }}
        className="w-full flex flex-col items-center mt-5 gap-2"
        transition={Flip}
      />
      {/* {waitersOrderList?.length === 0 ? (
        <div className="grid place-items-center h-[70vh]">
          <p className="font-semibold">No orders today</p>
        </div>
      ) : ( */}
      <div className="flex flex-col gap-2">
        {waitersOrderList?.map((item, index) => (
          <CardOrder item={item} key={index} index={index} />
        ))}
      </div>
      {/* )} */}
    </WaitersLayout>
  );
};

export default WaitersPage;
