import { useEffect, useLayoutEffect } from "react";
import { FoodCard } from "../../components/card/food-card/FoodCard";
import { HeaderNav } from "../../components/header-nav/HeaderNav";
import { BiSpreadsheet } from "react-icons/bi";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import "./Favourites.css";
import { Navbar } from "../../components/navbar/Navbar";
import { AnimatePresence } from "framer-motion";
import { AddToChart } from "../../components/modal/add-to-chart/AddToChart";
import { fetchFavourite } from "../../redux/favouriteSlice";

export const Favourites = () => {
  const { favourite, loading, error } = useAppSelector((state) => ({
    ...state.favourite,
  }));
  const { addChartModal } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavourite());
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  useLayoutEffect(() => {});

  return (
    <>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <div className="allitems-container">
        <HeaderNav />
        <Navbar />
        <div className="all-items-card-container">
          {favourite.map((item, index) => (
            <FoodCard foodItem={item} key={index} />
          ))}
        </div>
        <button className="allitems-button">
          <BiSpreadsheet />
        </button>
      </div>
    </>
  );
};
