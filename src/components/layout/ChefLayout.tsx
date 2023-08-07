import React from 'react';
import { HeaderNav } from '../header-nav/HeaderNav';
import { NavbarWaiters } from '../navbar/NavbarWaiters';
import ModalWaiters from '../modal/modal-waiters/ModalWaiters';
import { useAppSelector } from '../../redux/hook';
import { NavbarChef } from '../navbar/NavbarChef';

type ChefLayoutProps = {
  children: React.ReactNode;
};

const ChefLayout = ({ children }: ChefLayoutProps) => {
  const { waitersModalItem, waitersDrawer } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  return (
    <div className="home-container mb-4 pb-[100px]">
      <NavbarChef />
      {children}
    </div>
  );
};

export default ChefLayout;
