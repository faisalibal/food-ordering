import './HeaderNav.css';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
import { InputSearch } from '../input/InputSearch';
import { useAppSelector } from '../../redux/hook';
import { Dispatch, SetStateAction, useState } from 'react';

type search = {
  setSearch: Dispatch<SetStateAction<string>>;
};

export const HeaderNav = ({ setSearch }: search) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const { searchActive } = useAppSelector((state) => ({
    ...state.searchInput,
  }));

  return (
    <div className="header-nav-container relative">
      <span
        className="header-back"
        onClick={() => navigate(-1)}
        style={
          path === 'reservation' ||
          path === 'your-favourites' ||
          path === 'order-list'
            ? { display: 'none' }
            : {}
        }
      >
        <IoIosArrowBack onClick={() => navigate(0)} />
      </span>
      <span
        className="header-nav-name w-full"
        style={searchActive ? { display: 'none' } : {}}
      >
        <p className="w-full text-center">{path.split('-').join(' ')}</p>
      </span>
      <span className="absolute top-1 right-0">
        {path === 'reservation' ? (
          <Link to="new-reservation">
            <button className="plus-button">
              <AiOutlinePlus />
            </button>
          </Link>
        ) : path === 'order-list' ? (
          <Link to="all-items">
            <button className="plus-button">
              <AiOutlinePlus />
            </button>
          </Link>
        ) : path === 'your-favourites' ? (
          <InputSearch setSearch={setSearch} />
        ) : (
          ''
        )}
      </span>
    </div>
  );
};

export const HeaderNavAccount = () => {
  const location = useLocation();
  const pathBack = location.pathname.split('/')[1];
  const path = location.pathname.split('/')[2];
  const navigate = useNavigate();

  return (
    <div className="edit-profile-header relative w-full">
      <span
        onClick={() => navigate(`/${pathBack}`)}
        className="absolute left-0"
        style={{ top: '-6px' }}
      >
        <IoIosArrowBack />
      </span>
      <p className="w-full text-center capitalize">
        {path.split('-').join(' ')}
      </p>
      {path === 'edit-profile' && (
        <button className="text-sm absolute right-0" style={{ top: '-2px' }}>
          Save
        </button>
      )}
    </div>
  );
};
