import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FoodCard } from '../../components/card/food-card/FoodCard';
import { BiSpreadsheet } from 'react-icons/bi';
import { fetchFood } from '../../redux/FoodSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { AddToChart } from '../../components/modal/add-to-chart/AddToChart';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { fetchCategory } from '../../redux/CategorySlice';
import { InputSearch } from '../../components/input/InputSearch';
import { FaDisease } from 'react-icons/fa';
import { MdRecommend } from 'react-icons/md';
import { GiHotSpices } from 'react-icons/gi';
import noResult from '../../assets/images/no-result.png';

export const PopularPage = () => {
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

  return (
    <>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <div className="allitems-container">
        <div className="header-nav-container">
          <span className="header-back" onClick={() => navigate(`/${path}`)}>
            <IoIosArrowBack />
          </span>
          <span
            className="header-nav-name"
            id="popular-now"
            style={searchActive ? { display: 'none' } : {}}
          >
            <p>{pathName.split('-').join(' ')}</p>
          </span>
          <InputSearch setSearch={setSearch} />
        </div>
        {search.length > 0 ? (
          <>
            <p className="text-[14px] text-gray-400 mb-2">
              Search results from "{search}"
            </p>
            {food.filter((item) =>
              item.name.toLocaleLowerCase().includes(search)
            ).length === 0 ? (
              <div className="m-auto flex flex-col items-center">
                <img
                  src={noResult}
                  alt="favorite"
                  className="w-[100px] h-[100px] object-contain"
                />

                <p className="font-medium text-gray-400 text-[14px]">
                  No result found
                </p>
              </div>
            ) : (
              <div className="all-items-card-container">
                {food
                  .filter((item) =>
                    item.name.toLocaleLowerCase().includes(search)
                  )
                  .map((item, index) => (
                    <FoodCard foodItem={item} key={index} />
                  ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="h-fit">
              <span className="flex gap-2 items-center mb-1">
                <FaDisease className="-mt-1 text-primary" />
                <p className="font-semibold text-[18px] mb-1">Most Orders</p>
              </span>
              <div className="all-items-card-container">
                {food
                  .filter((item) =>
                    item.name.toLocaleLowerCase().includes('nasi')
                  )
                  .map((item, index) => (
                    <FoodCard foodItem={item} key={index} />
                  ))}
              </div>
            </div>
            <div className="h-fit">
              <span className="flex gap-2 items-center mb-1">
                <MdRecommend className="-mt-1 text-blue-600 text-[20px]" />
                <p className="font-semibold text-[18px] mb-1">
                  Cheff Recommended
                </p>
              </span>
              <div className="all-items-card-container">
                {food
                  .filter((item) =>
                    item.name
                      .toLocaleLowerCase()
                      .includes('nasi goreng kecombrang')
                  )
                  .map((item, index) => (
                    <FoodCard foodItem={item} key={index} />
                  ))}
              </div>
            </div>
            <div className="h-fit">
              <span className="flex gap-2 items-center mb-1">
                <GiHotSpices className="-mt-1 text-red-500 text-[20px]" />
                <p className="font-semibold text-[18px] mb-1">Spicy best</p>
              </span>
              <div className="all-items-card-container">
                {food
                  .filter((item) =>
                    item.name.toLocaleLowerCase().includes('nasi')
                  )
                  .map((item, index) => (
                    <FoodCard foodItem={item} key={index} />
                  ))}
              </div>
            </div>
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
