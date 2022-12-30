import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AccountPage } from "./page/account-page/AccountPage";
import { Allitems } from "./page/all-items/Allitems";
import { Favourites } from "./page/favourites-page/Favourites";
import { HomePage } from "./page/home-page/HomePage";
import { LandingPage } from "./page/landing-page/LandingPage";
import { OrderList } from "./page/order-list/OrderList";
import { Reservation } from "./page/reservation/Reservation";
import { useAppDispatch } from "./redux/hook";
import { fetchOrderList } from "./redux/OrderListSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrderList());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/all-items" element={<Allitems />} />
        <Route path="/your-favourites" element={<Favourites />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
