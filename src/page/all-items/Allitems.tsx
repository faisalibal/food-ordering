import { useEffect, useLayoutEffect } from "react";
import { FoodCard } from "../../components/card/food-card/FoodCard";
import { HeaderNav } from "../../components/header-nav/HeaderNav";
import { BiSpreadsheet } from "react-icons/bi";
import { fetchFood } from "../../redux/FoodSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import "./Allitems.css";
import { AddToChart } from "../../components/modal/add-to-chart/AddToChart";
import { AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsSearch } from "react-icons/bs";

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

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const pathName = location.pathname.split("/")[2];

  return (
    <>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <div className="allitems-container">
        <div className="header-nav-container">
          <span className="header-back" onClick={() => navigate(`/${path}`)}>
            <IoIosArrowBack />
          </span>
          {pathName === "popular-now" ? (
            <span className="header-nav-name">
              <p>{pathName.split("-").join(" ")}</p>
            </span>
          ) : (
            <div className="nav-item-choice">
              <span>
                All <p>Items</p>
              </span>
              <span>
                Main <p>Course</p>
              </span>
              <span>Drinks</span>
              <span>
                Side <p>Dish</p>
              </span>
              <span>Snacks</span>
            </div>
          )}

          <span>
            <BsSearch style={{ fontSize: "20px" }} />
          </span>
        </div>

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
