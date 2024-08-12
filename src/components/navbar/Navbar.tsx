import './Navbar.css';
import { AiFillHome, AiFillHeart } from 'react-icons/ai';
import { IoMdListBox } from 'react-icons/io';
import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hook';

export const Navbar = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const { orderList } = useAppSelector((state) => ({
    ...state.orderList,
  }));
  const navigate = useNavigate();

  return (
    <div className="navbar-container">
      <Link to="/home">
        <section>
          <span style={path === 'home' ? { color: '#FFBB7C' } : {}}>
            <AiFillHome />
          </span>
          <p style={path === 'home' ? { color: '#FFBB7C' } : {}}>Home</p>
        </section>
      </Link>
      <Link to="/reservation">
        <section>
          <span style={path === 'reservation' ? { color: '#FFBB7C' } : {}}>
            <FaCalendarAlt />
          </span>
          <p style={path === 'reservation' ? { color: '#FFBB7C' } : {}}>
            Reservation
          </p>
        </section>
      </Link>
      <Link to="/your-favourites">
        <section>
          <span style={path === 'your-favourites' ? { color: '#FFBB7C' } : {}}>
            <AiFillHeart />
          </span>
          <p style={path === 'your-favourites' ? { color: '#FFBB7C' } : {}}>
            Favourites
          </p>
        </section>
      </Link>
      <Link to="/order-list">
        <section className="order-nav">
          {orderList?.length >= 1 && (
            <div className="order-nav-available"></div>
          )}
          <span style={path === 'order-list' ? { color: '#FFBB7C' } : {}}>
            <IoMdListBox />
          </span>
          <p style={path === 'order-list' ? { color: '#FFBB7C' } : {}}>
            Orders
          </p>
        </section>
      </Link>
      <Link to="/account">
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
