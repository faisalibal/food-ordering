import './Navbar.css';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { IoMdListBox } from 'react-icons/io';
import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';
import { FiPhoneCall } from 'react-icons/fi';

export const NavbarWaiters = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const { orderList } = useAppSelector((state) => ({
    ...state.orderList,
  }));
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <Link to="/waiters/on-going">
        <section>
          <span style={path === 'on-going' ? { color: '#FFBB7C' } : {}}>
            <AiFillHome />
          </span>
          <p style={path === 'on-going' ? { color: '#FFBB7C' } : {}}>
            Ongoing orders
          </p>
        </section>
      </Link>
      <Link to="/waiters/all-order">
        <section className="order-nav">
          {orderList?.length >= 1 && (
            <div className="order-nav-available"></div>
          )}
          <span style={path === 'all-order' ? { color: '#FFBB7C' } : {}}>
            <IoMdListBox />
          </span>
          <p style={path === 'all-order' ? { color: '#FFBB7C' } : {}}>
            All Orders item
          </p>
        </section>
      </Link>
      <Link to="/waiters/account">
        <section>
          <span style={path === 'account' ? { color: '#FFBB7C' } : {}}>
            <FiPhoneCall />
          </span>
          <p style={path === 'account' ? { color: '#FFBB7C' } : {}}>Call</p>
        </section>
      </Link>
      <Link to="/waiters/account">
        <section>
          <span style={path === 'account' ? { color: '#FFBB7C' } : {}}>
            <FaUserCircle />
          </span>
          <p style={path === 'account' ? { color: '#FFBB7C' } : {}}>Account</p>
        </section>
      </Link>
    </div>
  );
};
