import React, { useEffect, useState } from 'react';
import './chef.css';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchChefOrder } from '../../redux/ChefSlice';
import ChefCard from './ChefCard';
import ChefLayout from '../../components/layout/ChefLayout';

const ChefAllOrders = () => {
  const { chefList } = useAppSelector((state) => ({ ...state.chefReducer }));

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchChefOrder());
  }, []);

  return (
    // <div className="h-[100vh] p-4 flex items-center">
    <ChefLayout>
      <div className="flex  overflow-x-scroll gap-4">
        {chefList.map((item, index) => (
          <ChefCard chefList={item} key={index} />
        ))}
      </div>
    </ChefLayout>
    // </div>
  );
};

export default ChefAllOrders;
