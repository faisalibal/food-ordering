import {
  ReservationHistoryCard,
  TransactionHistoryCard,
} from '../../components/card';
import { HeaderNavAccount } from '../../components/header-nav/HeaderNav';

export const MyVoucher = () => {
  return (
    <div className="flex flex-col p-5 m-auto gap-3">
      <HeaderNavAccount />
      <div>
        <h1 className="font-semibold my-4">My Voucher</h1>
      </div>
    </div>
  );
};

export const TransactionHistory = () => {
  return (
    <div className="flex flex-col p-5 m-auto gap-3">
      <HeaderNavAccount />
      <div>
        <h1 className="font-semibold my-4">History</h1>
        <div className="flex flex-col gap-2">
          <TransactionHistoryCard />
          <TransactionHistoryCard />
          <TransactionHistoryCard />
        </div>
      </div>
    </div>
  );
};

export const ReservationHistory = () => {
  return (
    <div className="flex flex-col p-5 m-auto gap-3">
      <HeaderNavAccount />
      <div>
        <h1 className="font-semibold my-4">History</h1>
        <div className="flex flex-col gap-2">
          <ReservationHistoryCard />
          <ReservationHistoryCard />
          <ReservationHistoryCard />
        </div>
      </div>
    </div>
  );
};
