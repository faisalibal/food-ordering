import { OrderCard } from '../../components/card/order-card/OrderCard';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import { Navbar } from '../../components/navbar/Navbar';
import { HiOutlineTicket } from 'react-icons/hi';
import './OrderList.css';
import { useEffect, useLayoutEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { fetchOrderList } from '../../redux/OrderListSlice';
import { Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { voucherModalTrue } from '../../redux/VoucherModal';
import { Vouchers } from '../../components/modal/vouchers/Vouchers';
import { AddToChart } from '../../components/modal/add-to-chart/AddToChart';
import { confirmationModalTrue } from '../../redux/confirmationModal';
import { OrderConfirmation } from '../../components/modal/order-confirmation/OrderConfirmation';
import noData from '../../assets/images/nodata.png';
import { fetchVoucher } from '../../redux/voucher-slice';

export const OrderList = () => {
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
  console.log(voucherValue);
  const { addChartModal } = useAppSelector((state) => ({
    ...state.addModalChart,
  }));
  const { voucherModal } = useAppSelector((state) => ({
    ...state.voucherModal,
  }));
  const { voucher, voucherWantUse } = useAppSelector((state) => ({
    ...state.voucher,
  }));
  const { confirmationModal } = useAppSelector((state) => ({
    ...state.confirmation,
  }));

  console.log(voucher);
  console.log(voucherWantUse);

  useEffect(() => {
    dispatch(fetchOrderList());
    dispatch(fetchVoucher());
  }, []);

  return (
    <>
      <AnimatePresence>{voucherModal && <Vouchers />}</AnimatePresence>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <AnimatePresence>
        {confirmationModal && <OrderConfirmation />}
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
                <OrderCard orderList={item} key={item.id} />
              ))}
            </div>
            <div className="order-page-addmore">
              <span>
                <p>Need anything else?</p>
                <small>Add other dishes, if you want.</small>
              </span>
              <Link to="all-items">
                <button>Add more</button>
              </Link>
            </div>
            <div
              className="order-page-voucher"
              onClick={() => dispatch(voucherModalTrue())}
            >
              <span>
                <HiOutlineTicket
                  style={{ fontSize: '31px', color: '#B5ED89' }}
                />
              </span>
              <span>You've 2 voucher</span>
            </div>
            <div className="payment-summary">
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
                  <div className="subtotal-summary">
                    <span>
                      <p>Voucher</p>
                    </span>
                    <span className="summary-price">Rp. {voucherValue}</span>
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
                <button
                  className="summary-button"
                  onClick={() => dispatch(confirmationModalTrue())}
                >
                  Proceed Order
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
