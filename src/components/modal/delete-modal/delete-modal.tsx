import { Dispatch, SetStateAction } from "react";
import cancel from "../../../assets/images/cancel.png";
import { useAppDispatch } from "../../../redux/hook";
import "./delete-modal.css";

type Modal = {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
};

export const DeleteModal = ({ setDeleteModal, handleDelete }: Modal) => {
  return (
    <div className="w-screen h-screen grid place-items-center fixed top-0 left-0 bg-opacity-30 bg-black">
      <div
        className="bg-white flex flex-col gap-3 items-center rounded-xl py-3"
        style={{ width: "calc(100vw - 40px)", maxWidth: "370px" }}
      >
        <div className="delete-modal-container">
          <img src={cancel} alt="cancel" />
        </div>
        <p className="text-base">Are you sure to cancel reservation</p>
        <div className="w-full flex justify-evenly mt-2">
          <button
            className="bg-green-400 py-2 rounded-xl text-white flex flex-wrap"
            style={{ maxWidth: "130px" }}
            onClick={() => setDeleteModal(false)}
          >
            Keep Reservation
          </button>
          <button
            className="bg-red-400 py-2 rounded-xl text-white"
            style={{ maxWidth: "130px" }}
            onClick={() => handleDelete()}
          >
            Cancel Reservation
          </button>
        </div>
      </div>
    </div>
  );
};
