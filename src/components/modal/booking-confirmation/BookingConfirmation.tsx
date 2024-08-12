import './BookingConfirmation.css';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { useAppDispatch } from '../../../redux/hook';
import useOnClickOutside from '../../../hook/useOnCLickOutside';
import { bookingConfirmationModalFalse } from '../../../redux/bookingConfirmation';
import { postReservation } from '../../../redux/reservationSlice';
import { useNavigate } from 'react-router-dom';
import { HelperDate } from '../../../helper/HelperDate';
import { baseURL } from '../../../config/axios';

type reservation = {
  name: string;
  phoneNumber: string;
  date: Date;
  timeReservation: string;
  pax: number;
  countryCode: string | undefined;
};

export const BookingConfirmation = ({
  date,
  name,
  pax,
  phoneNumber,
  timeReservation,
  countryCode,
}: reservation) => {
  const bookingConfirmationRef = useRef(null);
  const dispatch = useAppDispatch();
  const [isAgree, setIsAgree] = useState<boolean>(false);
  useOnClickOutside(bookingConfirmationRef, () =>
    dispatch(bookingConfirmationModalFalse())
  );
  const navigate = useNavigate();

  const handlePostReservation = async () => {
    // try {
    //   const response = await baseURL.post('/reservations', {

    //   })
    // } catch (error) {

    // }
    // await dispatch(postReservation(reservation));
    dispatch(bookingConfirmationModalFalse());
    navigate('/reservation');
  };

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
          transform: 'translateY(100%)',
        }}
        animate={{
          transform: 'translateY(0%)',
        }}
        exit={{
          transform: 'translateY(100%)',
        }}
        className="booking-confirmation-container"
        ref={bookingConfirmationRef}
      >
        <div
          className="modal-bar"
          onClick={() => dispatch(bookingConfirmationModalFalse())}
        ></div>
        <h3
          style={{ textAlign: 'left', width: '100%' }}
          className="booking-confirmation-title"
        >
          Booking Confirmation
        </h3>
        <div className="booking-information">
          <span>
            <p>Name</p>
            <p>{name}</p>
          </span>
          <span>
            <p>Phone Number</p>
            <p>
              {countryCode} {phoneNumber}
            </p>
          </span>
          <span>
            <p>Date</p>
            <p>{HelperDate(date?.toString())}</p>
          </span>
          <span>
            <p>Time</p>
            <p>{timeReservation} WIB</p>
          </span>
          <span>
            <p>Number of Pax</p>
            <p>{pax}</p>
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
                2. Your dine-in duration is <p>120 minutes</p>{' '}
              </span>
            </div>
            <div className="flex gap-4 items-center mt-3">
              <input
                type="checkbox"
                name=""
                id="checkbox"
                checked={isAgree}
                onChange={() => setIsAgree(!isAgree)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="checkbox"
                className="tesdulu"
                // onClick={handleLabelClick}
              >
                Yes, I agree
              </label>
            </div>
          </div>
        </div>
        <button
          className="booking-term-button"
          style={{ background: `${isAgree ? '#014A40' : 'gray'}` }}
          onClick={() => handlePostReservation()}
          disabled={!isAgree}
        >
          Confirm
        </button>
      </motion.div>
    </motion.div>
  );
};
