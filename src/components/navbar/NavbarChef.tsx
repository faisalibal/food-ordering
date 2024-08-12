import './Navbar.css';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { IoMdListBox } from 'react-icons/io';
import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';

export const NavbarChef = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const { orderList } = useAppSelector((state) => ({
    ...state.orderList,
  }));
  const navigate = useNavigate();

  return (
    <div className="navbar-container justify-evenly opacity-40 hover:opacity-100 transition-all">
      <Link to="/chef/work">
        <section>
          <span style={path === 'work' ? { color: '#FFBB7C' } : {}}>
            <AiFillHome />
          </span>
          <p style={path === 'work' ? { color: '#FFBB7C' } : {}}>Work</p>
        </section>
      </Link>
      <Link to="/chef/all-order">
        <section className="order-nav">
          {orderList?.length >= 1 && (
            <div className="order-nav-available"></div>
          )}
          <span style={path === 'all-order' ? { color: '#FFBB7C' } : {}}>
            <IoMdListBox />
          </span>
          <p style={path === 'all-order' ? { color: '#FFBB7C' } : {}}>
            All Orders
          </p>
        </section>
      </Link>
      {/* <Link to="/waiters/account">
        <section>
          <span style={path === 'account' ? { color: '#FFBB7C' } : {}}>
            <FaUserCircle />
          </span>
          <p style={path === 'account' ? { color: '#FFBB7C' } : {}}>Account</p>
        </section>
      </Link> */}
    </div>
  );
};
