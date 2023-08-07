import { useEffect, useLayoutEffect, useState } from 'react';
import { FoodCard } from '../../components/card/food-card/FoodCard';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import { BiSpreadsheet } from 'react-icons/bi';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import './Favourites.css';
import { Navbar } from '../../components/navbar/Navbar';
import { AnimatePresence } from 'framer-motion';
import { AddToChart } from '../../components/modal/add-to-chart/AddToChart';
import { fetchFavourite } from '../../redux/favouriteSlice';
import favorite from '../../assets/images/favorite.png';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsFillTrashFill } from 'react-icons/bs';

export const Favourites = () => {
  const { favourite, loading, error } = useAppSelector((state) => ({
    ...state.favourite,
  }));
  const { addChartModal } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  const [search, setSearch] = useState<string>('');

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavourite());
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useLayoutEffect(() => {});

  // const notify = (pesan: string) => {
  //   if (pesan === 'success') {
  //     toast.success('Food added to your favourite', {
  //       position: 'top-center',
  //       autoClose: 800,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: false,
  //       progress: undefined,
  //       closeButton: false,
  //     });
  //   }
  //   if (pesan === 'remove') {
  //     toast.warning('Food removed from your favourite', {
  //       position: 'top-center',
  //       autoClose: 800,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: false,
  //       progress: undefined,
  //       closeButton: false,
  //       icon: (
  //         <span className="bg-red-400 aspect-square rounded-full p-1 grid place-items-center">
  //           <BsFillTrashFill className="text-white text-sm " />
  //         </span>
  //       ),
  //     });
  //   }
  // };

  return (
    <>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <div className="allitems-container">
        <HeaderNav setSearch={setSearch} />
        <Navbar />

        {favourite?.length < 1 ? (
          <div className="order-empty">
            <div className="order-empty-illustration">
              <img src={favorite} alt="favorite" />
            </div>
            <p>You dont have favourite food</p>
            <Link to="/your-favourites/all-items">
              <button>See all foods !</button>
            </Link>
          </div>
        ) : (
          <div className="favourite-container">
            {favourite
              ?.filter((item) => item.name.toLocaleLowerCase().includes(search))
              .map((item, index) => (
                <FoodCard foodItem={item} key={index} />
              ))}
          </div>
        )}
        <button className="allitems-button">
          <BiSpreadsheet />
        </button>
      </div>
    </>
  );
};
