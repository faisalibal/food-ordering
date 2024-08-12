import { CgFileDocument } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

type transactionHistory = {};

export const TransactionHistoryCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className="grid grid-cols-20/80 shadow-3xl py-2 "
      style={{ borderRadius: '12px' }}
      onClick={() => navigate('/order-list/confirm-order/payment-receipt')}
    >
      <div className="grid place-items-center">
        <CgFileDocument className="text-5xl text-gray-800" />
      </div>
      <div className="flex flex-col justify-between text pr-3 gap-1">
        <div className="flex justify-between text-xs font-semibold">
          <p>Order ID</p>
          <p>123abc</p>
        </div>
        <div className="flex justify-between text-xs font-semibold">
          <p>Payment methods</p>
          <p>Pay to cashier</p>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <p>4 Items</p>
          <p>02 January 2022, 13:00 WIB</p>
        </div>
      </div>
    </div>
  );
};

export const ReservationHistoryCard = () => {
  return (
    <div
      className="grid grid-cols-20/80 shadow-3xl py-2 "
      style={{ borderRadius: '12px' }}
    >
      <div className="grid place-items-center">
        <CgFileDocument className="text-5xl" />
      </div>
      <div className="flex flex-col justify-evenly text pr-3">
        <div className="flex justify-between text-xs font-semibold">
          <p>Booking ID</p>
          <p>123abc</p>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <p>4 Pax</p>
          <p>02 January 2022, 13:00 WIB</p>
        </div>
      </div>
    </div>
  );
};
