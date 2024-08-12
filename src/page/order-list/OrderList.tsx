import { OrderCard } from '../../components/card/order-card/OrderCard';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import { Navbar } from '../../components/navbar/Navbar';
import { HiOutlineTicket } from 'react-icons/hi';
import './OrderList.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
// import { fetchOrderList } from '../../redux/OrderListSlice';
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
import { fetchVoucher } from '../../redux/voucher-slice';
import { ItemOrderDTO } from '../../DTO/OrderListDTO';
import { VoucherDTO } from '../../DTO/VoucherDTO';
import {
  setSubTotal,
  setTaxes,
  setTotalItem,
  setTotalOrder,
  setVoucherValue,
} from '../../redux/OrderListSlice';
import { ConfirmOrder } from '../confirm-order/confirm-order';

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
  const [paymentModal, setPaymentModal] = useState<boolean>(false);
  const [tabActive, setTabACtive] = useState<string>('add-order');
  const [helperUpdateCount, setHelperUpdateCount] = useState<boolean>(false);
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

  useEffect(() => {
    dispatch(fetchVoucher());
  }, []);

  const updateCount = (orderList: ItemOrderDTO[]) => {
    const getOrderSubTotal = (orderList: ItemOrderDTO[]) => {
      const total = orderList?.reduce(
        (amount, item) => item?.food?.price * item?.quantity + amount,
        0
      );
      // return total;
      dispatch(setSubTotal(total));
      // setSubtotal(total);
    };

    type totalItem = {
      orderList: ItemOrderDTO[];
      voucherUse: VoucherDTO;
    };

    const getOrderTotalItem = (orderList: ItemOrderDTO[]) => {
      const totalItem = orderList?.reduce(
        (amount, item) => item?.quantity + amount,
        0
      );
      dispatch(setTotalItem(totalItem));
      // setTotalItem(totalItem);
    };

    const getVoucher = ({ orderList, voucherUse }: totalItem) => {
      let totalItem = orderList?.reduce(
        (amount, item) => item?.food?.price * item?.quantity + amount,
        0
      );
      if (voucherUse.value !== 0) {
        totalItem = (totalItem * voucherUse.value) / 100;
        // setVoucherValue(totalItem);
        dispatch(setVoucherValue(totalItem));
      }
      setVoucherValue(0);
    };

    const getOrderTaxes = (orderList: ItemOrderDTO[]) => {
      const subTotal = orderList?.reduce(
        (amount, item) => item?.food?.price * item?.quantity + amount,
        0
      );
      const taxes = (subTotal * 11) / 100; //taxes 10%//
      // setTaxes(taxes);
      dispatch(setTaxes(taxes));
    };

    const getOrderTotal = ({ orderList, voucherUse }: totalItem) => {
      let subTotal = orderList?.reduce(
        (amount, item) => item?.food?.price * item?.quantity + amount,
        0
      );
      if (voucherUse.value) {
        const totalVoucher = (subTotal * voucherUse.value) / 100;
        subTotal = subTotal - totalVoucher;
      }
      const taxes = (subTotal * 10) / 100; //taxes 10%//
      const total = subTotal + taxes;
      // setTotal(total);
      dispatch(setTotalOrder(total));
    };

    const totalOrder = {
      orderList: orderList,
      voucherUse: voucherWantUse,
    };

    getOrderSubTotal(orderList);
    getVoucher(totalOrder);
    getOrderTotalItem(orderList);
    getOrderTaxes(orderList);
    getOrderTotal(totalOrder);
  };

  useEffect(() => {
    updateCount(orderList);
  }, [helperUpdateCount]);

  return (
    <>
      <AnimatePresence>{voucherModal && <Vouchers />}</AnimatePresence>
      <AnimatePresence>{addChartModal && <AddToChart />}</AnimatePresence>
      <AnimatePresence>
        {confirmationModal && <OrderConfirmation />}
      </AnimatePresence>
      <AnimatePresence>
        {paymentModal && (
          <ChoosePaymentMethod setPaymentModal={setPaymentModal} />
        )}
      </AnimatePresence>
      <div className="order-page-container">
        <HeaderNav setSearch={() => {}} />
        <div className="flex w-full justify-around items-center -mt-[30px]">
          <p
            className={`${
              tabActive === 'add-order'
                ? 'text-[#f19f5d] font-bold px-3 py-1 '
                : 'bg-none px-3 py-1 text-gray-500 font-semibold '
            } flex justify-center w-[100vw] border-b shadow-md text-[14px]`}
            onClick={() => setTabACtive('add-order')}
          >
            Add order
          </p>
          <p
            className={`${
              tabActive === 'your-order'
                ? 'text-[#f19f5d] font-bold px-3 py-1 '
                : 'bg-none px-3 py-1 text-gray-500 font-semibold'
            } flex justify-center w-[100vw] border-b text-[14px] shadow-md`}
            onClick={() => setTabACtive('your-order')}
          >
            Your order
          </p>
        </div>
        <Navbar />

        <>
          {tabActive === 'add-order' ? (
            <>
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
                    {orderList?.map((item, index) => (
                      <OrderCard
                        orderList={item}
                        key={index}
                        index={index}
                        setHelperUpdateCount={setHelperUpdateCount}
                        helperUpdateCount={helperUpdateCount}
                      />
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
                    <span>You've {voucher?.length} voucher</span>
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
                        onClick={() => dispatch(confirmationModalTrue())}
                      >
                        Proceed Order
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : tabActive === 'your-order' ? (
            <>
              <ConfirmOrder
                paymentModal={paymentModal}
                setPaymentModal={setPaymentModal}
              />
            </>
          ) : (
            ''
          )}
        </>
      </div>
    </>
  );
};
