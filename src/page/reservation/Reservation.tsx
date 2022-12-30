import { useLayoutEffect } from "react";
import { ReservationCard } from "../../components/card/reservation-card/ReservationCard";
import { HeaderNav } from "../../components/header-nav/HeaderNav";
import { Navbar } from "../../components/navbar/Navbar";
import "./Reservation.css";

export const Reservation = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <div className="reservation-page-container">
      <HeaderNav />
      <Navbar />
      <ReservationCard />
    </div>
  );
};
