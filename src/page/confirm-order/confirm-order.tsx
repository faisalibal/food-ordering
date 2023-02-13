import {
  ConfirmOrderCard,
  OrderCard,
} from '../../components/card/order-card/OrderCard';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import { Navbar } from '../../components/navbar/Navbar';
import { HiOutlineTicket } from 'react-icons/hi';
import './OrderList.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchOrderList } from '../../redux/OrderListSlice';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { voucherModalTrue } from '../../redux/VoucherModal';
import { Vouchers } from '../../components/modal/vouchers/Vouchers';
import { AddToChart } from '../../components/modal/add-to-chart/AddToChart';
import { confirmationModalTrue } from '../../redux/confirmationModal';
import {
  ChoosePaymentMethod,
  OrderConfirmation,
} from '../../components/modal/order-confirmation/OrderConfirmation';
import noData from '../../assets/images/nodata.png';

export const ConfirmOrder = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const dispatch = useAppDispatch();
  const {
    orderList,
    subTotal,
    totalItem,
    taxes,
    total,
    voucherValue,
    loading,
    error,
  } = useAppSelector((state) => ({
    ...state.orderList,
  }));
  const { voucher, voucherWantUse } = useAppSelector((state) => ({
    ...state.voucher,
  }));
  const [paymentModal, setPaymentModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchOrderList());
  }, []);

  return (
    <>
      <AnimatePresence>
        {paymentModal && (
          <ChoosePaymentMethod setPaymentModal={setPaymentModal} />
        )}
      </AnimatePresence>
      <div className="order-page-container">
        <HeaderNav setSearch={() => {}} />
        <Navbar />
        {orderList.length < 1 ? (
          <div className="order-empty">
            <div className="order-empty-illustration">
              <img src={noData} alt="emptydata" />
            </div>
            <p>You dont have any order</p>
            <Link to="all-items">
              <button>Order now !</button>
            </Link>
          </div>
        ) : (
          <>
            <div className="order-cart-container">
              {orderList.map((item) => (
                <ConfirmOrderCard orderList={item} key={item.id} />
              ))}
            </div>
            <div className="payment-summary mt-5">
              <div>
                <h4>Payment Summary</h4>
              </div>
              <div className="payment-summary-box">
                <div className="summary-detail">
                  <div className="subtotal-summary">
                    <span>
                      <p>Subtotal</p>
                      <small>{totalItem} items</small>
                    </span>
                    <span className="summary-price">Rp. {subTotal}</span>
                  </div>
                  {voucherWantUse.value && (
                    <div className="subtotal-summary">
                      <span>
                        <p>Voucher ({voucherWantUse.value}%)</p>
                      </span>
                      <span className="summary-price text-green-400">
                        - Rp. {voucherValue}
                      </span>
                    </div>
                  )}
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
                <button
                  className="summary-button"
                  onClick={() => setPaymentModal(true)}
                >
                  Pay now
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
