import { useEffect, useLayoutEffect } from "react";
import { FoodCard } from "../../components/card/food-card/FoodCard";
import { HeaderNav } from "../../components/header-nav/HeaderNav";
import { BiSpreadsheet } from "react-icons/bi";
import { fetchFood } from "../../redux/FoodSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import "./Allitems.css";
import { AddToChart } from "../../components/modal/add-to-chart/AddToChart";
import { AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export const Allitems = () => {
  const { food, loading, error } = useAppSelector((state) => ({
    ...state.food,
  }));
  const dispatch = useAppDispatch();
  const { addChartModal } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  useEffect(() => {
    dispatch(fetchFood());
  }, []);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <div className="allitems-container">
        <HeaderNav />
        <div className="all-items-card-container">
          {food.map((item, index) => (
            <FoodCard foodItem={item} key={index} />
          ))}
        </div>
        <Link to="/order-list">
          <button className="allitems-button">
            <BiSpreadsheet />
          </button>
        </Link>
      </div>
    </>
  );
};
