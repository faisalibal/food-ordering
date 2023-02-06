import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FoodCard } from '../../components/card/food-card/FoodCard';
import { BiSpreadsheet } from 'react-icons/bi';
import { fetchFood } from '../../redux/FoodSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import './Allitems.css';
import { AddToChart } from '../../components/modal/add-to-chart/AddToChart';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchCategory } from '../../redux/CategorySlice';
import { InputSearch } from '../../components/input/InputSearch';

export const Allitems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const pathName = location.pathname.split('/')[2];
  const { food, loading, error } = useAppSelector((state) => ({
    ...state.food,
  }));
  const { category } = useAppSelector((state) => ({
    ...state.category,
  }));
  const { searchActive } = useAppSelector((state) => ({
    ...state.searchInput,
  }));
  const dispatch = useAppDispatch();
  const { addChartModal } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  const [search, setSearch] = useState<string>('');

  const [activeMenu, setActiveMenu] = useState(pathName);
  const searchRef = useRef(null);

  useEffect(() => {
    dispatch(fetchFood());
    dispatch(fetchCategory());
    setActiveMenu(pathName);
  }, [pathName]);

  useLayoutEffect(() => {
    const element = document.getElementById(pathName);
    if (activeMenu === pathName) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    if (activeMenu === 'all-items' || activeMenu === 'popular-now') {
      window.scrollTo({ top: 0 });
    }
  }, []);

  function notify(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <AnimatePresence>
        {addChartModal && <AddToChart notify={notify} />}
      </AnimatePresence>
      <div className="allitems-container" style={{ marginBottom: '100px' }}>
        <div className="header-nav-container">
          <span className="header-back" onClick={() => navigate(`/${path}`)}>
            <IoIosArrowBack />
          </span>
          {pathName === 'popular-now' ? (
            <span
              className="header-nav-name"
              id="popular-now"
              style={searchActive ? { display: 'none' } : {}}
            >
              <p>{pathName.split('-').join(' ')}</p>
            </span>
          ) : (
            <div
              className="nav-item-choice"
              style={searchActive ? { display: 'none' } : {}}
            >
              <Link to={`/${path}/all-items`} id="all-items">
                <span
                  style={
                    pathName === 'all-items'
                      ? { fontWeight: '600', color: '#0F1F0D' }
                      : {}
                  }
                >
                  All <p>Items</p>
                </span>
              </Link>

              {category?.map((item, index) => (
                <Link
                  to={`/${path}/${item.category}`}
                  replace={true}
                  key={index}
                  id={item.category}
                >
                  <span
                    style={
                      pathName === item.category
                        ? { fontWeight: '600', color: '#0F1F0D' }
                        : {}
                    }
                  >
                    {item.categoryName.split(' ')[0]}
                    <p>{item.categoryName.split(' ')[1]}</p>
                  </span>
                </Link>
              ))}
            </div>
          )}
          <InputSearch setSearch={setSearch} />
        </div>
        {pathName === 'all-items' || pathName === 'popular-now' ? (
          <div className="all-items-card-container">
            {food
              .filter((item) => item.name.toLocaleLowerCase().includes(search))
              .map((item, index) => (
                <FoodCard foodItem={item} key={index} />
              ))}
          </div>
        ) : (
          <div className="all-items-card-container ">
            {food
              .filter((item) => item.kategory === pathName)
              .filter((item) => item.name.toLocaleLowerCase().includes(search))
              .map((item, index) => (
                <FoodCard foodItem={item} key={index} />
              ))}
          </div>
        )}
        <Link to="/order-list">
          <button className="allitems-button">
            <BiSpreadsheet />
          </button>
        </Link>
      </div>
    </>
  );
};
