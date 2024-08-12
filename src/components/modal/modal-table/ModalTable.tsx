import "./ModalTable.css";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { useRef } from "react";
import useOnClickOutside from "../../../hook/useOnCLickOutside";
import { modalTableFalse } from "../../../redux/ModalTable";
import table1 from "../../../assets/images/table1.png";
import table2 from "../../../assets/images/table2.png";

export const ModalTable = () => {
  const { modalTable } = useAppSelector((state) => ({
    ...state.modalTable,
  }));
  const modalTableFalses = useRef(null);
  const dispatch = useAppDispatch();

  useOnClickOutside(modalTableFalses, () => {
    dispatch(modalTableFalse());
  });
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.1,
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: 0.3,
          duration: 0.1,
        },
      }}
      className="modal-voucher"
    >
      <motion.div
        initial={{
          transform: "translateY(100%)",
        }}
        animate={{
          transform: "translateY(0%)",
        }}
        exit={{
          transform: "translateY(100%)",
        }}
        className="modal-table-container"
        ref={modalTableFalses}
      >
        <div
          className="modal-bar"
          onClick={() => dispatch(modalTableFalse())}
        ></div>
        <div className="mod-table-container">
          <div className="mod-table-no">
            <p>Table No.</p>
            <span>20</span>
          </div>
          <span className="mod-tab-title">People on this table:</span>
          <div className="table-people-container">
            <div className="mod-tab-people">
              <div className="mod-tab-people-avatar">
                <div>
                  <img src={table1} alt="avatar" />
                </div>
                <p>John Doe</p>
              </div>
              <p>+628123456789</p>
            </div>
            <div className="mod-tab-people">
              <div className="mod-tab-people-avatar">
                <div>
                  <img src={table2} alt="avatar" />
                </div>
                <p>John Doe</p>
              </div>
              <p>+628123456789</p>
            </div>
          </div>
        </div>
        <button
          className="mod-tab-close"
          onClick={() => dispatch(modalTableFalse())}
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};
