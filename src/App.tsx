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
import { useAppDispatch } from './redux/hook';
import { fetchOrderList } from './redux/OrderListSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrderList());
    dispatch(fetchFavourite());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
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
        <Route path="/order-list/confirm-order" element={<ConfirmOrder />} />
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
