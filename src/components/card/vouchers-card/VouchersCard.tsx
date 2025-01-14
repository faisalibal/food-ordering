import { IoTicket } from 'react-icons/io5';
import { VoucherDTO } from '../../../DTO/VoucherDTO';
import { HelperDate } from '../../../helper/HelperDate';
import { fetchFood } from '../../../redux/FoodSlice';
import { useAppDispatch } from '../../../redux/hook';
// import {
//   fetchOrderList,
//   fetchVoucherOrder,
//   getVoucher,
// } from '../../../redux/OrderListSlice';
import { fetchVoucherId } from '../../../redux/voucher-slice';
import { voucherModalModalFalse } from '../../../redux/VoucherModal';
import './VouchersCard.css';

type voucherItem = {
  voucher: VoucherDTO;
};
export const VouchersCard = ({ voucher }: voucherItem) => {
  const dispatch = useAppDispatch();

  const handleCLick = async () => {
    try {
      // await dispatch(fetchVoucherId(voucher.id));
      // await dispatch(fetchVoucherOrder(voucher.id));
      // await dispatch(fetchOrderList());
      await dispatch(voucherModalModalFalse());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="voucher-card-container active:bg-slate-100"
      onClick={() => handleCLick()}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div className="voucher-icon">
          <IoTicket />
        </div>
        <div className="voucher-detail">
          <span className="capitalize">{voucher.name}</span>
          <span>Valid till {HelperDate(voucher.valid)}</span>
        </div>
      </div>
      <div className="voucher-usenow">
        <p>Use now</p>
      </div>
    </div>
  );
};
