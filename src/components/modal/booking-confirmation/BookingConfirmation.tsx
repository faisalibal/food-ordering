import "./BookingConfirmation.css";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useAppDispatch } from "../../../redux/hook";
import useOnClickOutside from "../../../hook/useOnCLickOutside";
import { bookingConfirmationModalFalse } from "../../../redux/bookingConfirmation";

export const BookingConfirmation = () => {
  const bookingConfirmationRef = useRef(null);
  const dispatch = useAppDispatch();
  useOnClickOutside(bookingConfirmationRef, () =>
    dispatch(bookingConfirmationModalFalse())
  );
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
        className="booking-confirmation-container"
        ref={bookingConfirmationRef}
      >
        <div
          className="modal-bar"
          onClick={() => dispatch(bookingConfirmationModalFalse())}
        ></div>
        <h3
          style={{ textAlign: "left", width: "100%" }}
          className="booking-confirmation-title"
        >
          Booking Confirmation
        </h3>
        <div className="booking-information">
          <span>
            <p>Name</p>
            <p>John Doe</p>
          </span>
          <span>
            <p>Phone Number</p>
            <p>+62 8123456789</p>
          </span>
          <span>
            <p>Date</p>
            <p>01 January 2023</p>
          </span>
          <span>
            <p>Time</p>
            <p>13:00 WIB</p>
          </span>
          <span>
            <p>Number of Pax</p>
            <p>2</p>
          </span>
        </div>
        <div className="booking-confirmation-term">
          <h3>Term & Conditions</h3>
          <div className="booking-term-box">
            <div className="booking-term-text">
              <span>
                1. Please arrive <p> 15 minutes </p> before
              </span>
              <span>
                2. Your dine-in duration is <p>120 minutes</p>{" "}
              </span>
              <span>
                3. Please scan Peduli Lindungi QR-Code and wear a mask properly
              </span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <input type="checkbox" name="" id="" />
              <p className="tesdulu">Yes, I agree</p>
            </div>
          </div>
        </div>
        <button className="booking-term-button">Confirm</button>
      </motion.div>
    </motion.div>
  );
};
