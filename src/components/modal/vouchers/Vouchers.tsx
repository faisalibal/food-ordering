import './Vouchers.css';
import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { VouchersCard } from '../../card/vouchers-card/VouchersCard';
import { voucherModalModalFalse } from '../../../redux/VoucherModal';
import useOnClickOutside from '../../../hook/useOnCLickOutside';
import { useRef } from 'react';

export const Vouchers = () => {
  const { voucherModal } = useAppSelector((state) => ({
    ...state.voucherModal,
  }));
  const voucherModalFalse = useRef(null);
  const dispatch = useAppDispatch();

  useOnClickOutside(voucherModalFalse, () =>
    dispatch(voucherModalModalFalse())
  );
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
          transform: 'translateY(100%)',
        }}
        animate={{
          transform: 'translateY(0%)',
        }}
        exit={{
          transform: 'translateY(100%)',
        }}
        className="modal-voucher-container"
        ref={voucherModalFalse}
      >
        <div
          className="modal-bar"
          onClick={() => dispatch(voucherModalModalFalse())}
        ></div>
        <h3>Available offers</h3>
        <input type="text" placeholder="Enter promo code here" />
        <div className="voucher-card-box">
          <VouchersCard />
          <VouchersCard />
          <VouchersCard />
          <VouchersCard />
          <VouchersCard />
          <VouchersCard />
        </div>
      </motion.div>
    </motion.div>
  );
};
