import "./OrderConfirmation.css";
import { motion } from "framer-motion";
import { useRef } from "react";
import useOnClickOutside from "../../../hook/useOnCLickOutside";
import { confirmationModalModalFalse } from "../../../redux/confirmationModal";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { ConfirmationCard } from "../../card/confirmation-card/ConfirmationCard";

export const OrderConfirmation = () => {
  const orderConfirmationRef = useRef(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(orderConfirmationRef, () =>
    dispatch(confirmationModalModalFalse())
  );

  const { orderList, subTotal, totalItem, taxes, total, loading, error } =
    useAppSelector((state) => ({
      ...state.orderList,
    }));

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
      className="modal-confirmation"
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
        className="modal-confirmation-container"
        ref={orderConfirmationRef}
      >
        <div
          className="modal-bar"
          onClick={() => dispatch(confirmationModalModalFalse())}
        ></div>
        <h3
          style={{
            textAlign: "left",
            width: "100%",
            fontWeight: "600",
            fontSize: "18px",
          }}
        >
          Order Confirmation
        </h3>
        <div className="confirmation-card-box">
          {orderList.map((item) => (
            <ConfirmationCard orderList={item} />
          ))}
        </div>
        <div className="confirmation-box">
          <div className="summary-detail">
            <div className="subtotal-summary">
              <span>
                <p>Subtotal</p>
                <small>{totalItem} items</small>
              </span>
              <span className="summary-price">Rp. {subTotal}</span>
            </div>
            <div className="summary-taxes">
              <p>Taxes</p>
              <p>Rp. {taxes}</p>
            </div>
          </div>
          <div className="summary-total">
            <span>
              <p>Total</p>
              <small>{totalItem} items</small>
            </span>
            <p>Rp. {total}</p>
          </div>
          <button className="summary-button">Confirm</button>
        </div>
      </motion.div>
    </motion.div>
  );
};
