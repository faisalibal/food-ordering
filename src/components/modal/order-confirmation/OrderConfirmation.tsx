import './OrderConfirmation.css';
import { motion } from 'framer-motion';
import { Dispatch, SetStateAction, useRef } from 'react';
import useOnClickOutside from '../../../hook/useOnCLickOutside';
import { confirmationModalModalFalse } from '../../../redux/confirmationModal';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { ConfirmationCard } from '../../card/confirmation-card/ConfirmationCard';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleClick = () => {
    try {
      navigate('/order-list/confirm-order');
      dispatch(confirmationModalModalFalse());
    } catch (error) {
      console.log(error);
    }
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
        className="modal-confirmation-container"
        ref={orderConfirmationRef}
      >
        <div
          className="modal-bar"
          onClick={() => dispatch(confirmationModalModalFalse())}
        ></div>
        <h3
          style={{
            textAlign: 'left',
            width: '100%',
            fontWeight: '600',
            fontSize: '18px',
          }}
        >
          Order Confirmation
        </h3>
        <div className="confirmation-card-box">
          {orderList.map((item, index) => (
            <ConfirmationCard orderList={item} key={index} />
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
          <button className="summary-button" onClick={() => handleClick()}>
            Confirm
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

type paymentModal = {
  setPaymentModal: Dispatch<SetStateAction<boolean>>;
};

export const ChoosePaymentMethod = ({ setPaymentModal }: paymentModal) => {
  const choosePaymentMethodRef = useRef(null);
  const navigate = useNavigate();
  useOnClickOutside(choosePaymentMethodRef, () => setPaymentModal(false));

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
        className="modal-confirmation-container bg-primary"
        ref={choosePaymentMethodRef}
      >
        <div className="modal-bar" onClick={() => setPaymentModal(false)}></div>
        <p className="text-xl font-semibold text-white">
          Choose Payment Method
        </p>
        <div className="flex flex-col gap-4 mb-4">
          <button className="bg-secondary text-white font-semibold py-2 px-4 text-lg rounded-[20px] ">
            Virtual Account
          </button>
          <button
            className=" text-secondary border-secondary border-2 font-semibold py-2 px-4 text-lg rounded-[20px]"
            onClick={() =>
              navigate('/order-list/confirm-order/payment-receipt')
            }
          >
            Pay to Cashier
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};
