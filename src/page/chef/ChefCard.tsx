import React, { useEffect, useState } from 'react';
import { HelperDate } from '../../helper/HelperDate';
import { OrderDTO } from '../../DTO/OrderListDTO';
import { WaitersOrderCard } from '../../components/card/order-card/OrderCard';
import { OrderList } from '../order-list/OrderList';
import { baseURL } from '../../config/axios';
import { useAppDispatch } from '../../redux/hook';
import { fetchChefOrder } from '../../redux/ChefSlice';
import ChefItemCard from './ChefItemCard';

type chefCard = {
  chefList: OrderDTO;
};

const ChefCard = ({ chefList }: chefCard) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const totalItem = chefList?.items.length;
  const itemDone = chefList?.items?.filter((item) => {
    return item.statusId === 5 || item.statusId === 4;
  });
  const percentage = (itemDone.length / totalItem) * 100;
  const [statusCook, setStatusCook] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const startTime = new Date(chefList.createdAt);

    const interval = setInterval(() => {
      const currentTime = new Date();
      const updatedElapsedTime = currentTime.getTime() - startTime.getTime();

      setElapsedTime(updatedElapsedTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [chefList.createdAt]);

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

  const handleStartCook = async () => {
    const updateData = chefList.items.map((item) => {
      return {
        id: item.id,
        data: {
          statusId: 3,
        },
      };
    });
    try {
      const response = await baseURL.patch(
        `/item-order/update-many`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(fetchChefOrder());
    } catch (error) {
      console.log(error);
    }
  };

  const handleFinishCook = async () => {
    const updateData = chefList.items.map((item) => {
      return {
        id: item.id,
        data: {
          statusId: 4,
        },
      };
    });
    try {
      const response = await baseURL.patch(
        `/item-order/update-many`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      dispatch(fetchChefOrder());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getStatus = () => {
      chefList?.items?.map((item) => {
        if (item.statusId === 2) {
          setStatusCook(true);
        }
      });
    };
    getStatus();
  }, []);

  return (
    <div className="chef-card min-w-[90vw] h-[90vh] rounded-lg overflow-hidden py-5">
      <div className=" flex flex-col px-5 border-r items-center justify-between">
        <div className="flex justify-between items-center w-full border-b pb-5">
          <span className="w-[10vw] h-[10vw] bg-white rounded-full text-[4vw] flex-col flex items-center justify-center font-semibold">
            <p className="text-[12px] -mb-3 font-medium">Table no.</p>
            {chefList?.table?.table_no}
          </span>
          <p
            className={`text-[5vw] font-bold ${
              percentage <= 50 ? 'text-red-200' : 'text-green-300'
            }`}
          >
            {percentage.toFixed(0)}%
          </p>
        </div>
        <div className="flex flex-col py-5 justify-between h-full">
          <p className="text-white">
            Order at {HelperDate(chefList?.createdAt?.toString())}
          </p>
          {statusCook ? (
            <button
              className="bg-amber-500 text-white py-1 px-2 rounded-lg w-full"
              onClick={handleStartCook}
            >
              Start Cook
            </button>
          ) : (
            <button
              className="bg-green-400 text-white py-1 px-2 rounded-lg w-full"
              onClick={handleFinishCook}
            >
              Finish All
            </button>
          )}
        </div>
        <div className="text-[5vw] text-white border-t pt-5 w-full grid place-items-center">
          {hours}:{minutes}:{seconds}
        </div>
      </div>
      <div className="px-5 flex flex-col gap-2 overflow-y-auto">
        {chefList?.items?.map((item, index) => (
          <ChefItemCard orderList={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ChefCard;
