import { useEffect, useLayoutEffect } from "react";
import { ReservationCard } from "../../components/card/reservation-card/ReservationCard";
import { HeaderNav } from "../../components/header-nav/HeaderNav";
import { Navbar } from "../../components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchReservation } from "../../redux/reservationSlice";
import "./Reservation.css";

export const Reservation = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { reservationData, loading, error } = useAppSelector((state) => ({
    ...state.reservation,
  }));

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchReservation());
  }, []);

  return (
    <div className="reservation-page-container">
      <HeaderNav />
      <Navbar />
      {reservationData?.length >= 1 ? (
        <div className="reservation-box-card">
          {reservationData.map((item, index) => (
            <ReservationCard reservation={item} key={index} />
          ))}
        </div>
      ) : (
        <div>
          <p>You dont have any reservation</p>
        </div>
      )}
    </div>
  );
};
