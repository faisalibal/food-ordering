import { Dispatch, SetStateAction } from 'react';
import error from '../../../assets/images/error.png';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { setErrorModalFalse } from '../../../redux/confirmationModal';

type Modal = {
  setDeleteModal: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
};

export const ErrorModal = () => {
  const { errorMessage } = useAppSelector((state) => ({
    ...state.confirmation,
  }));
  const dispatch = useAppDispatch();
  return (
    <div className="w-screen h-screen grid place-items-center fixed top-0 left-0 bg-opacity-70 bg-black z-50">
      <div
        className="bg-white flex flex-col gap-3 items-center rounded-xl py-3"
        style={{ width: 'calc(100vw - 40px)', maxWidth: '370px' }}
      >
        <div className="delete-modal-container">
          <img src={error} alt="cancel" />
        </div>
        <p className="text-base">{errorMessage}</p>
        <div className="w-full flex justify-evenly mt-2">
          <button
            className="bg-red-400 py-2 rounded-xl text-white flex flex-wrap w-full justify-center"
            style={{ maxWidth: '130px' }}
            onClick={() => dispatch(setErrorModalFalse())}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
