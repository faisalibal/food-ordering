import React, { useEffect, useState } from 'react';
import './chef.css';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchChefOrder, fetchChefOrderWork } from '../../redux/ChefSlice';
import ChefCard from './ChefCard';
import ChefLayout from '../../components/layout/ChefLayout';
import Empty from '../../assets/svg/Empty';

const Chef = () => {
  const { chefwork } = useAppSelector((state) => ({ ...state.chefReducer }));

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchChefOrderWork());
  }, []);

  return (
    // <div className="h-[100vh] p-4 flex items-center">
    <ChefLayout>
      {chefwork.length === 0 ? (
        <div className="grid place-items-center h-[70vh]">
          <Empty width="250" height="250" />
          <p className="font-semibold">No orders today</p>
        </div>
      ) : (
        <div className="flex  overflow-x-scroll gap-4">
          {chefwork.map((item, index) => (
            <ChefCard chefList={item} key={index} />
          ))}
        </div>
      )}
    </ChefLayout>
    // </div>
  );
};

export default Chef;
