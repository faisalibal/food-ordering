import "./HomePage.css";
import logo from "../../assets/images/logo.png";
import sphagetti from "../../assets/images/sphagetti.jpg";
import { BsSearch } from "react-icons/bs";
import mainCourse from "../../assets/images/cat-course.png";
import drinks from "../../assets/images/cat-drink.png";
import sideDish from "../../assets/images/cat-sideDish.png";
import snacks from "../../assets/images/cat-snacks.png";
import { CategoriesCard } from "../../components/card/categories-card/CategoriesCard";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchFood } from "../../redux/FoodSlice";
import { FoodCard } from "../../components/card/food-card/FoodCard";
import { Navbar } from "../../components/navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { AddToChart } from "../../components/modal/add-to-chart/AddToChart";
import { AnimatePresence } from "framer-motion";
import { fetchOrderList } from "../../redux/OrderListSlice";
import { modalTableTrue } from "../../redux/ModalTable";
import { ModalTable } from "../../components/modal/modal-table/ModalTable";

export const category = [
  {
    categoryName: "Main Course",
    image: mainCourse,
  },
  {
    categoryName: "Drinks",
    image: drinks,
  },
  {
    categoryName: "Side Dish",
    image: sideDish,
  },
  {
    categoryName: "Snacks",
    image: snacks,
  },
];

export const HomePage = () => {
  const { food, loading, error } = useAppSelector((state) => ({
    ...state.food,
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFood());
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

  return (
    <>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <AnimatePresence>{modalTable && <ModalTable />}</AnimatePresence>
      <div className="home-container">
        <Navbar />
        <div className="home-header">
          <div className="header-left">
            <div className="home-logo">
              <img src={logo} alt="logo" />
            </div>
            <p>Hi, John Doe</p>
            <p>Good Afternoon</p>
          </div>
          <div className="header-right">
            <p>Table No.</p>
            <span onClick={() => dispatch(modalTableTrue())}>20</span>
          </div>
        </div>
        <div className="home-body">
          <div className="search-container">
            <BsSearch className="search-icon" />
            <input
              type="text"
              placeholder="What you wanna eat/drink today"
              className="home-search"
            />
          </div>
          <div className="food-image">
            <img src={sphagetti} alt="food-image" />
          </div>
        </div>
        <div className="home-categories">
          <div className="home-cat-title">
            <p>Categories</p>
            <Link to="all-items" style={{ textDecoration: "none" }}>
              <p style={{ fontSize: "11px", color: "#f19f5d" }}>
                View All Items
              </p>
            </Link>
          </div>
          <div className="categories-container">
            {category.map((item, index) => (
              <CategoriesCard CategoryItem={item} key={index} />
            ))}
          </div>
        </div>
        <div className="home-popular">
          <div className="home-pop-title">
            <p>Popular Now</p>
            <p onClick={() => navigate("popular-now")}>View All</p>
          </div>
          <div className="popular-container">
            {food.map((item, index) => (
              <FoodCard foodItem={item} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
