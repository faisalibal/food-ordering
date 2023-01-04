import { useState } from "react";
import { ReservationDTO } from "../../../DTO/ReservationDTO";
import "./ReservationCard.css";

type reservation = {
  reservation: ReservationDTO;
};

export const ReservationCard = ({ reservation }: reservation) => {
  const [paid, setPaid] = useState<boolean>(false);

  return (
    <div className="reservation-card">
      <section>
        <p>Booking Code</p>
        <p>B01012200{reservation.id}</p>
      </section>
      <section>
        <p>Date</p>
        <p>{reservation.date}</p>
      </section>
      <section>
        <p>Time</p>
        <p>{reservation.time} WIB</p>
      </section>
      <section>
        <p>Number of Pax</p>
        <p>{reservation.pax}</p>
      </section>
      <section>
        <p>Status</p>
        {/* <span className="reservation-unpaid">Unpaid</span> */}
        <span
          className="reservation-unpaid"
          style={{ background: paid ? "#80D33E" : "#ec4c4c" }}
        >
          {paid ? "Paid" : "Unpaid"}
        </span>
      </section>
    </div>
  );
};
