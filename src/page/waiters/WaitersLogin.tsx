import React from 'react';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import { NavbarWaiters } from '../../components/navbar/NavbarWaiters';

const WaitersLogin = () => {
  return (
    <div className="home-container mb-4">
      <HeaderNav setSearch={() => {}} />
      <NavbarWaiters />
    </div>
  );
};

export default WaitersLogin;
