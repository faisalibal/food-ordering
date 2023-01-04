import "./AddToChart.css";
import { BsFillClockFill, BsFillHeartFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { addChartModalFalse } from "../../../redux/AddChartModal";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { OrderListDTO } from "../../../DTO/OrderListDTO";
import {
  fetchOrderList,
  postOrderList,
  updateOrderList,
} from "../../../redux/OrderListSlice";
import useOnClickOutside from "../../../hook/useOnCLickOutside";
import chef from "../../../assets/icons/chef.png";
import cabai from "../../../assets/icons/cabai.png";
import {
  deleteFavourite,
  fetchFavourite,
  postFavourite,
} from "../../../redux/favouriteSlice";
import { useLocation } from "react-router-dom";

export const AddToChart = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  //======================Start Dispatch Redux=========================//
  const dispatch = useAppDispatch();
  const { foodId } = useAppSelector((state) => ({
    ...state.food,
  }));
  const { favourite } = useAppSelector((state) => ({
    ...state.favourite,
  }));
  const { orderList } = useAppSelector((state) => ({
    ...state.orderList,
  }));
  //=====================End Dispatch Redux===========================//

  //=====================Start State hook=============================//
  const bodyModal = useRef(null);
  const [counter, setCounter] = useState<number>(1);
  const [availableOrder, setAvailableOrder] = useState<boolean>(false);
  const [availableFavourite, setAvailableFavourite] = useState<boolean>(false);
  const [itemChart, setItemChart] = useState<OrderListDTO>({
    id: foodId?.id,
    kategory: foodId?.kategory,
    name: foodId?.name,
    price: foodId?.price,
    quantity: counter,
    note: "",
    image: foodId?.image,
  });
  //=====================End State hook=============================//

  //====================Start Handle Function=======================//
  const handleDispatchAddOrder = () => {
    const addOrder = async () => {
      if (availableOrder) {
        await dispatch(updateOrderList(itemChart));
        await dispatch(fetchOrderList());
      }
      if (availableOrder === false) {
        await dispatch(postOrderList(itemChart));
        await dispatch(fetchOrderList());
      }
      dispatch(addChartModalFalse());
    };
    addOrder();
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setItemChart((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleCounter = (action: string) => {
    if (action === "-") {
      setCounter(counter - 1 != 0 ? counter - 1 : 1);
    }
    if (action === "+") {
      setCounter(counter + 1);
    }
  };

  const handleAddFavourite = () => {
    if (availableFavourite) {
      const handleFav = async () => {
        await dispatch(deleteFavourite(foodId.id));
        await dispatch(fetchFavourite());
        setAvailableFavourite(false);
        if (path === "your-favourites") {
          setTimeout(() => {
            dispatch(addChartModalFalse());
          }, 100);
        }
      };
      handleFav();
    } else {
      const handleFav = async () => {
        try {
          await dispatch(postFavourite(foodId));
          await dispatch(fetchFavourite());
          setAvailableFavourite(true);
        } catch (error) {
          console.log(error);
        }
      };
      handleFav();
    }
  };
  //====================End Handle Function=======================//

  //====================Start UseEffect===========================//
  useEffect(() => {
    setItemChart((prev) => ({
      ...prev,
      quantity: counter,
    }));
  }, [counter]);

  useLayoutEffect(() => {
    setItemChart({
      id: foodId?.id,
      kategory: foodId?.kategory,
      name: foodId?.name,
      price: foodId?.price,
      quantity: counter,
      note: "",
      image: foodId?.image,
    });
    const viewOptions = () => {
      const view = orderList.filter((item) => item.id === foodId.id);
      if (view.length >= 1) {
        setAvailableOrder(true);
        const [data] = view;
        setCounter(data.quantity);
        setItemChart((prev) => ({
          ...prev,
          note: data.note,
        }));
      }
    };

    const heartFavourite = () => {
      const heart = favourite.filter((item) => item.id === foodId.id);
      if (heart.length >= 1) {
        setAvailableFavourite(true);
      }
    };

    viewOptions();
    heartFavourite();
  }, []);
  //====================End UseEffect===========================//

  useOnClickOutside(bodyModal, () => dispatch(addChartModalFalse()));

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: 0.3,
          duration: 0.1,
        },
      }}
      className="modal-chart"
    >
      <motion.div
        initial={{
          transform: "translateY(100%)",
        }}
        animate={{
          transform: "translateY(0%)",
        }}
        exit={{
          transform: "translateY(100%)",
        }}
        className="modal-chart-container"
        ref={bodyModal}
      >
        <div
          className="modal-bar"
          onClick={() => dispatch(addChartModalFalse())}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "28px",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <div
              style={{ position: "absolute", right: "0px" }}
              onClick={() => handleAddFavourite()}
            >
              <BsFillHeartFill
                style={
                  availableFavourite
                    ? { color: "#F19F5D", fontSize: "36px" }
                    : { color: "#fffcfa", fontSize: "36px" }
                }
              />
            </div>
            <div className="modal-chart-image">
              <img src={foodId.image} alt="chart-image" />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <div className="modal-chart-detail">
              <div
                style={{ display: "flex", flexDirection: "column", gap: "4px" }}
              >
                <p className="modal-chart-name">{foodId.name}</p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "12px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginTop: "-3px",
                    }}
                  >
                    <img src={chef} alt="" />
                    <img src={cabai} alt="" />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <BsFillClockFill
                      style={{ color: "#80D33E", fontSize: "16px" }}
                    />
                    <p
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontWeight: "700",
                        fontSize: "12px",
                        color: "white",
                      }}
                    >
                      4 - 10 Min
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="modal-chart-price">
                  Rp. {foodId.price.toLocaleString()}
                </p>
              </div>
            </div>
            <p className="modal-chart-description">{foodId.description}</p>
            <textarea
              className="modal-chart-note"
              placeholder="Add Notes.."
              id="note"
              onChange={handleTextAreaChange}
              defaultValue={availableOrder ? itemChart.note : ""}
            ></textarea>
          </div>
          <div className="modal-chart-button">
            <div className="counter-button">
              <button style={counter === 1 ? { background: "#dddddd" } : {}}>
                <AiOutlineMinus onClick={() => handleCounter("-")} />
              </button>
              <p>{counter}</p>
              <button>
                <AiOutlinePlus onClick={() => handleCounter("+")} />
              </button>
            </div>
            <button
              className="modal-chart-addtolist"
              onClick={() => handleDispatchAddOrder()}
            >
              {availableOrder ? "Update Order" : " Add to Order List"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
