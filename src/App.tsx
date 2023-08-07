import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AccountInfo from './page/account-info/account-info';
import { AccountPage } from './page/account-page/AccountPage';
import { AddReservationPage } from './page/add-reservation-page/AddReservationPage';
import { Allitems } from './page/all-items/Allitems';
import { ConfirmOrder } from './page/confirm-order/confirm-order';
import { EditProfile } from './page/edit-profile/EditProfile';
import { Favourites } from './page/favourites-page/Favourites';
import {
  ChoiceLoginType,
  GuestLoginPage,
  LoginPage,
  RegisterPage,
} from './page/guest-login-page/GuestLoginPage';
import {
  MyVoucher,
  ReservationHistory,
  TransactionHistory,
} from './page/history';
import { HomePage } from './page/home-page/HomePage';
import { LandingPage } from './page/landing-page/LandingPage';
import { OrderList } from './page/order-list/OrderList';
import { PaymentReceipt } from './page/payment-receipt/payment-receipt';
import { PopularPage } from './page/popular-page/popular-page';
import { Reservation } from './page/reservation/Reservation';
import { fetchFavourite } from './redux/favouriteSlice';
import { useAppDispatch, useAppSelector } from './redux/hook';
import WaitersPage from './page/waiters/WaitersPage';
import WaiterAllOrder from './page/waiters/WaiterAllOrder';
import WaitersAccount from './page/waiters/WaitersAccount';
import Chef from './page/chef/Chef';
// import { fetchOrderList } from './redux/OrderListSlice';
import { io } from 'socket.io-client';
import { baseURL } from './config/axios';
import {
  fetchWaitersOrder,
  fetchWaitersOrderId,
  fetchWaitersOrderItem,
  getNotif,
} from './redux/WaitersSlice';
import { fetchChefOrder, fetchChefOrderWork } from './redux/ChefSlice';
import { fetchOrderGuest } from './redux/OrderListSlice';
import ChefAllOrders from './page/chef/ChefAllOrders';
import WaitersCall from './page/waiters/WaitersCall';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socket = io(import.meta.env.VITE_APP_BASEURL || ''); // Ganti URL dan port dengan server WebSocket Anda

    socket.on('updated', (newItemOrder: any) => {
      // Lakukan sesuatu saat ada item order baru
      // console.log('Item order baru:', newItemOrder);
      const update = async () => {
        dispatch(fetchWaitersOrder());
        await dispatch(fetchWaitersOrderItem());
        await dispatch(fetchChefOrder());
        await dispatch(fetchChefOrderWork());
        // console.log(newItemOrder);
        await dispatch(fetchOrderGuest(newItemOrder.order.guestId));
        if (newItemOrder.orderId !== 0) {
          await dispatch(fetchWaitersOrderId(newItemOrder.orderId));
        }
      };
      update();
    });

    socket.on('created', (newItemOrder: any) => {
      // Lakukan sesuatu saat ada item order baru
      // console.log('Item order baru:', newItemOrder);
      dispatch(fetchWaitersOrderItem());
      dispatch(fetchWaitersOrder());
      dispatch(fetchChefOrder());
      dispatch(fetchChefOrderWork());
    });

    socket.on('createdWaiters', (newItemOrder: any) => {
      dispatch(getNotif());
    });

    socket.on('created', (newItemOrder: any) => {
      dispatch(getNotif());
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/choice-login-type" element={<ChoiceLoginType />} />
        <Route path="/guest-login" element={<GuestLoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all-items" element={<Allitems />} />
        <Route path="/home/main-course" element={<Allitems />} />
        <Route path="/home/drinks" element={<Allitems />} />
        <Route path="/home/side-dish" element={<Allitems />} />
        <Route path="/home/snacks" element={<Allitems />} />
        <Route path="/home/popular-now" element={<PopularPage />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/order-list/all-items" element={<Allitems />} />
        <Route path="/order-list/main-course" element={<Allitems />} />
        <Route path="/order-list/drinks" element={<Allitems />} />
        <Route path="/order-list/side-dish" element={<Allitems />} />
        <Route path="/order-list/snacks" element={<Allitems />} />
        <Route path="/waiters/on-going" element={<WaitersPage />} />
        <Route path="/waiters/all-order" element={<WaiterAllOrder />} />
        <Route path="/waiters/call" element={<WaitersCall />} />
        <Route path="/waiters/account" element={<WaitersAccount />} />
        <Route path="/chef/work" element={<Chef />} />
        <Route path="/chef/all-order" element={<ChefAllOrders />} />
        <Route
          path="/order-list/confirm-order/payment-receipt"
          element={<PaymentReceipt />}
        />
        <Route
          path="/order-list/confirm-order/payment-receipt-va"
          element={<PaymentReceipt />}
        />
        <Route path="/your-favourites" element={<Favourites />} />
        <Route path="/your-favourites/all-items" element={<Allitems />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/edit-profile" element={<EditProfile />} />
        <Route
          path="/reservation/new-reservation"
          element={<AddReservationPage />}
        />
        <Route path="/new-reservation" element={<AddReservationPage />} />
        <Route path="/account/:info" element={<AccountInfo />} />
        <Route
          path="/account/transaction-history"
          element={<TransactionHistory />}
        />
        <Route path="/account/my-voucher" element={<MyVoucher />} />
        <Route
          path="/account/reservation-history"
          element={<ReservationHistory />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
