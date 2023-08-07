import React, { SetStateAction, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ItemOrderDTO } from '../../../DTO/OrderListDTO';
import useOnClickOutside from '../../../hook/useOnCLickOutside';
import { WaitersOrderCard } from '../../card/order-card/OrderCard';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import {
  addWaitersDrawerItemFalse,
  addWaitersModalItemFalse,
} from '../../../redux/AddChartModal';
import { Modal } from 'rsuite';
import { fetchWaitersOrderId } from '../../../redux/WaitersSlice';
import { io } from 'socket.io-client';

const ModalWaiters = () => {
  const bodyModal = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { tableNo, waiterOrderId } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  const { waiterOrderId: waiterItem } = useAppSelector((state) => ({
    ...state.waitersOrder,
  }));

  useEffect(() => {
    // const socket = io(import.meta.env.VITE_APP_BASEURL || ''); // Ganti URL dan port dengan server WebSocket Anda
    // socket.on('updated', (newItemOrder: any) => {
    //   // Lakukan sesuatu saat ada item order baru
    //   // console.log('Item order baru:', newItemOrder);
    //   const update = async () => {
    //     dispatch(fetchWaitersOrderId(waiterOrderId));
    //   };
    //   update();
    // });
    const data = async () => {
      await dispatch(fetchWaitersOrderId(waiterOrderId));
    };
    data();
  }, []);

  console.log(waiterOrderId, 'id');

  useEffect(() => {
    if (bodyModal.current) {
      // Menerapkan animasi saat komponen dimount
      bodyModal.current.style.animation = 'slideIn 0.3s forwards';
    }

    return () => {
      // Menerapkan animasi saat komponen diunmount
      if (bodyModal.current) {
        bodyModal.current.style.animation = 'slideOut 0.3s forwards';
      }
    };
  }, []);

  return (
    <>
      <div className="modal-chart h-[100vh] w-[100vw] top-0 left-0">
        <div
          className="modal-chart-container h-[100vh] rounded-none"
          ref={bodyModal}
        >
          <div className="flex justify-between w-full items-center">
            <span className="h-[50px] w-[50px] bg-white grid place-items-center rounded-full font-bold text-[18px]">
              {waiterItem?.table?.table_no}
            </span>
            <div
              className="modal-bar h-[30px] grid place-items-center font-semibold"
              onClick={() => dispatch(addWaitersDrawerItemFalse())}
            >
              Close
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              {waiterItem?.items?.map((item, index) => (
                <WaitersOrderCard key={index} orderList={item} />
              ))}
            </div>
          </div>
          <button className="absolute bottom-4 w-[calc(100vw-10vw)] bg-green-400 text-white py-2 px-2 rounded-xl">
            Reserved All
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalWaiters;
