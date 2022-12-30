import { useState } from "react";
import "./ReservationCard.css";

export const ReservationCard = () => {
  const [paid, setPaid] = useState<boolean>(false);
  return (
    <div className="reservation-card">
      <section>
        <p>Booking Code</p>
        <p>B010122001</p>
      </section>
      <section>
        <p>Date</p>
        <p>01 January 2022</p>
      </section>
      <section>
        <p>Time</p>
        <p>13:00 WIB</p>
      </section>
      <section>
        <p>Number of Pax</p>
        <p>2</p>
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
