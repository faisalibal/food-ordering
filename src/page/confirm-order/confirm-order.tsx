import { ConfirmOrderCard } from '../../components/card/order-card/OrderCard';
import './OrderList.css';
import { SetStateAction, useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
// import { fetchOrderList } from '../../redux/OrderListSlice';
import { Link } from 'react-router-dom';
import noData from '../../assets/images/nodata.png';
import {
  fetchOrderGuest,
  setSubTotal,
  setTaxes,
  setTotalItem,
  setTotalOrder,
  setVoucherValue,
} from '../../redux/OrderListSlice';
import { GuestDTO, ItemOrderDTO } from '../../DTO/OrderListDTO';
import { VoucherDTO } from '../../DTO/VoucherDTO';

type confirmOrder = {
  paymentModal: boolean;
  setPaymentModal: React.Dispatch<SetStateAction<boolean>>;
};

export const ConfirmOrder = ({
  paymentModal,
  setPaymentModal,
}: confirmOrder) => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const dispatch = useAppDispatch();
  const { orderList, subTotal, totalItem, taxes, total, voucherValue } =
    useAppSelector((state) => ({
      ...state.orderList,
    }));
  const { voucher, voucherWantUse } = useAppSelector((state) => ({
    ...state.voucher,
  }));
  const guest: GuestDTO = JSON.parse(localStorage.getItem('guest') ?? '');

  const { yourOrder } = useAppSelector((state) => ({ ...state.orderList }));

  useEffect(() => {
    dispatch(fetchOrderGuest(guest.guest_id));
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
    updateCount(yourOrder.items);
  }, [yourOrder.items]);

  return (
    <>
      <div className="flex flex-col">
        {Object.keys(yourOrder).length === 0 ? (
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
              {yourOrder?.items?.map((item) => (
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
                {/* {yourOrder.orderStatusId === 1 ? (
                  ''
                ) : ( */}
                {yourOrder?.orderStatusId !== 1 ? (
                  ''
                ) : (
                  <button
                    className="summary-button"
                    onClick={() => setPaymentModal(true)}
                  >
                    Pay now
                  </button>
                )}

                {/* )} */}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
