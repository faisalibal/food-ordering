import React from 'react';
import { HeaderNav } from '../header-nav/HeaderNav';
import { NavbarWaiters } from '../navbar/NavbarWaiters';
import ModalWaiters from '../modal/modal-waiters/ModalWaiters';
import { useAppSelector } from '../../redux/hook';

type WaitersLayoutProps = {
  children: React.ReactNode;
};

const WaitersLayout = ({ children }: WaitersLayoutProps) => {
  const { waitersModalItem, waitersDrawer } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  return (
    <div className="home-container mb-4 pb-[100px]">
      {waitersDrawer && <ModalWaiters />}
      <HeaderNav setSearch={() => {}} />
      <NavbarWaiters />
      {children}
    </div>
  );
};

export default WaitersLayout;
