import { SetStateAction, useEffect, useLayoutEffect, useState } from "react";
import { ReservationCard } from "../../components/card/reservation-card/ReservationCard";
import { HeaderNav } from "../../components/header-nav/HeaderNav";
import { DeleteModal } from "../../components/modal/delete-modal/delete-modal";
import { Navbar } from "../../components/navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { fetchReservation } from "../../redux/reservationSlice";
import reservation from "../../assets/images/reservation.png";
import "./Reservation.css";
import { Link } from "react-router-dom";

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
    <>
      <div className="reservation-page-container ">
        <HeaderNav
          setSearch={function (value: SetStateAction<string>): void {
            throw new Error("Function not implemented.");
          }}
        />
        <Navbar />
        {reservationData?.length >= 1 ? (
          <div className="reservation-box-card mb-16">
            {reservationData.map((item, index) => (
              <ReservationCard reservation={item} key={index} />
            ))}
          </div>
        ) : (
          <div>
            <div className="order-empty">
              <div className="order-empty-illustration">
                <img src={reservation} alt="emptydata" />
              </div>
              <p>You dont have reservation</p>
              <Link to="/reservation/new-reservation">
                <button>Reserv now !</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
