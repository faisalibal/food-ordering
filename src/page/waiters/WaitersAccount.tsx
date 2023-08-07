import React from 'react';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import { NavbarWaiters } from '../../components/navbar/NavbarWaiters';
import { Link } from 'react-router-dom';
import { HiOutlineTicket } from 'react-icons/hi';
import { BiEdit, BiHistory } from 'react-icons/bi';
import { CgLoadbarDoc } from 'react-icons/cg';
import avatar from '../../assets/images/avatar.png';

const WaitersAccount = () => {
  return (
    <div className="home-container mb-4">
      <HeaderNav setSearch={() => {}} />
      <NavbarWaiters />
      <div className="account-information">
        <div className="account-information-left">
          <div className="avatar-image">
            <img src={avatar} alt="" />
          </div>
          <div className="account-info">
            <p>John Doe</p>
            {/* <p>+62 81234567891</p> */}
          </div>
        </div>
        <div className="account-information-right">
          <span>Waiters</span>
          <Link to="edit-profile">
            <span className="edit-profile-nav">
              <BiEdit />
              <p>Edit profile</p>
            </span>
          </Link>
        </div>
      </div>

      <h4 className="account-bold">Account</h4>
      <div className="card-menu-container">
        <Link to="/account/transaction-history">
          <span className="account-card-menu">
            <CgLoadbarDoc style={{ fontSize: '28px' }} />
            <p>Transaction history</p>
          </span>
        </Link>
        <span
          className="account-card-menu"
          // onClick={() => dispatch(voucherModalTrue())}
        >
          <HiOutlineTicket style={{ fontSize: '28px' }} />
          <p>My voucher</p>
        </span>
        <Link to="/account/reservation-history">
          <span className="account-card-menu">
            <BiHistory style={{ fontSize: '28px' }} />
            <p>Reservation history</p>
          </span>
        </Link>
        {/* <span className="account-card-menu">
            <BiCreditCard style={{ fontSize: '28px' }} />
            <p>Payment methods</p>
          </span> */}
        {/* <span className="account-card-menu">
            <BiHelpCircle style={{ fontSize: '28px' }} />
            <p>Help</p>
          </span> */}
      </div>
      <button className="account-signout">Sign out</button>
    </div>
  );
};

export default WaitersAccount;
