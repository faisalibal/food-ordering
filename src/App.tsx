import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountPage } from "./page/account-page/AccountPage";
import { AddReservationPage } from "./page/add-reservation-page/AddReservationPage";
import { Allitems } from "./page/all-items/Allitems";
import { EditProfile } from "./page/edit-profile/EditProfile";
import { Favourites } from "./page/favourites-page/Favourites";
import { GuestLoginPage } from "./page/guest-login-page/GuestLoginPage";
import { HomePage } from "./page/home-page/HomePage";
import { LandingPage } from "./page/landing-page/LandingPage";
import { OrderList } from "./page/order-list/OrderList";
import { Reservation } from "./page/reservation/Reservation";
import { fetchFavourite } from "./redux/favouriteSlice";
import { useAppDispatch } from "./redux/hook";
import { fetchOrderList } from "./redux/OrderListSlice";

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
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/all-items" element={<Allitems />} />
        <Route path="/home/main-course" element={<Allitems />} />
        <Route path="/home/drinks" element={<Allitems />} />
        <Route path="/home/side-dish" element={<Allitems />} />
        <Route path="/home/snacks" element={<Allitems />} />
        <Route path="/home/popular-now" element={<Allitems />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/order-list/all-items" element={<Allitems />} />
        <Route path="/order-list/main-course" element={<Allitems />} />
        <Route path="/order-list/drinks" element={<Allitems />} />
        <Route path="/order-list/side-dish" element={<Allitems />} />
        <Route path="/order-list/snacks" element={<Allitems />} />
        <Route path="/your-favourites" element={<Favourites />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/edit-profile" element={<EditProfile />} />
        <Route
          path="/reservation/new-reservation"
          element={<AddReservationPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
