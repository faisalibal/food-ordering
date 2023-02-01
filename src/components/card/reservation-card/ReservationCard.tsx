import { Dispatch, SetStateAction, useState } from "react";
import { ReservationDTO } from "../../../DTO/ReservationDTO";
import { useAppDispatch } from "../../../redux/hook";
import {
  deleteReservation,
  fetchReservation,
} from "../../../redux/reservationSlice";
import { DeleteModal } from "../../modal/delete-modal/delete-modal";
import "./ReservationCard.css";

type reservation = {
  reservation: ReservationDTO;
};

export const ReservationCard = ({ reservation }: reservation) => {
  const [paid, setPaid] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      await dispatch(deleteReservation(reservation.id));
      await dispatch(fetchReservation());
      setDeleteModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {deleteModal && (
        <DeleteModal
          setDeleteModal={setDeleteModal}
          handleDelete={handleDelete}
        />
      )}
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
            className="text-xs text-white py-1 px-2 rounded-lg"
            style={{
              background: paid ? "#80D33E" : "rgb(248 113 113)",
            }}
          >
            {paid ? "Paid" : "Unpaid"}
          </span>
        </section>
        <section className="w-full flex items-center justify-center">
          <button
            className="rounded-lg bg-red-400 text-white text-sm py-1 px-2 m-auto"
            onClick={() => setDeleteModal(true)}
          >
            Cancel Reservation
          </button>
        </section>
      </div>
    </>
  );
};
