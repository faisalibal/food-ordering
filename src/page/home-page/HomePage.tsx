import './HomePage.css';
import logo from '../../assets/images/logo.png';
import sphagetti from '../../assets/images/sphagetti.jpg';
import { BsFillTrashFill, BsSearch } from 'react-icons/bs';
import { CategoriesCard } from '../../components/card/categories-card/CategoriesCard';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchFood } from '../../redux/FoodSlice';
import { FoodCard } from '../../components/card/food-card/FoodCard';
import { Navbar } from '../../components/navbar/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { AddToChart } from '../../components/modal/add-to-chart/AddToChart';
import { AnimatePresence } from 'framer-motion';
import { modalTableTrue } from '../../redux/ModalTable';
import { ModalTable } from '../../components/modal/modal-table/ModalTable';
import { fetchCategory } from '../../redux/CategorySlice';
import { Greeting } from '../../helper/Greeting';
import noResult from '../../assets/images/no-result.png';
import { BiPhoneCall } from 'react-icons/bi';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const HomePage = () => {
  const { food, loading, error } = useAppSelector((state) => ({
    ...state.food,
  }));
  const { category } = useAppSelector((state) => ({
    ...state.category,
  }));
  const [search, setSearch] = useState<string>('');

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFood());
    dispatch(fetchCategory());
  }, []);
  const { addChartModal } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  const { modalTable } = useAppSelector((state) => ({
    ...state.modalTable,
  }));
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const waiters = () => {
    toast.success('Okayy.. Waiters will come', {
      position: 'top-center',
      autoClose: 800,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      closeButton: true,
    });
  };

  return (
    <>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <AnimatePresence>{modalTable && <ModalTable />}</AnimatePresence>
      <div className="home-container mb-4">
        <Navbar />
        <ToastContainer
          toastStyle={{
            borderRadius: '12px',
            width: '300px',
            fontSize: '16px',
            fontWeight: 500,
          }}
          className="w-full flex flex-col items-center mt-5 gap-2"
          transition={Flip}
        />
        <div className="home-header">
          <div className="header-left">
            <div className="home-logo">
              <img src={logo} alt="logo" />
            </div>
            <p>Hi, John Doe</p>
            <p>{Greeting()}</p>
            <button
              className="bg-primary text-white rounded-md text-sm py-1 px-2 shadow-md active:opacity-[0.8] flex items-center gap-2 w-fit"
              onClick={waiters}
            >
              <BiPhoneCall />
              Call Waiters
            </button>
          </div>
          <div className="header-right">
            <p>Table No.</p>
            <span onClick={() => dispatch(modalTableTrue())}>20</span>
          </div>
        </div>
        <div className="search-container sticky top-1">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="What you wanna eat/drink today"
            className="home-search"
            onChange={handleChange}
          />
        </div>
        {search.length > 0 ? (
          <>
            <p className="text-[14px] text-gray-400">
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
          <div className="flex flex-col gap-3">
            <div className="home-body my-3">
              <img
                src={sphagetti}
                alt="food-image"
                className="w-[500px] h-[180px] object-cover rounded-xl"
              />
              <img
                src={sphagetti}
                alt="food-image"
                className="w-[500px] h-[180px] object-cover rounded-xl"
              />
            </div>
            <div className="home-categories">
              <div className="home-cat-title">
                <p>Categories</p>
                <Link to="all-items" style={{ textDecoration: 'none' }}>
                  <p style={{ fontSize: '11px', color: '#f19f5d' }}>
                    View All Items
                  </p>
                </Link>
              </div>
              <div className="categories-container">
                {category?.map((item, index) => (
                  <Link to={`/home/${item.category}`} key={index}>
                    <CategoriesCard CategoryItem={item} />
                  </Link>
                ))}
              </div>
            </div>
            <div className="home-popular">
              <div className="home-pop-title">
                <p>Popular Now</p>
                <p onClick={() => navigate('popular-now')}>View All</p>
              </div>
              <div className="popular-container">
                {food.map((item, index) => (
                  <FoodCard foodItem={item} key={index} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
