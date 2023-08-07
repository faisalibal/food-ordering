import { ItemOrderDTO } from '../../../DTO/OrderListDTO';
import './ConfirmationCard.css';

type orderList = {
  orderList: ItemOrderDTO;
};

export const ConfirmationCard = ({ orderList }: orderList) => {
  return (
    <div className="confirmation-card-container">
      <div className="confirmation-card-left">
        <p>{orderList.food.name}</p>
        <p>{orderList.quantity} item</p>
        <p>Notes: {orderList.note}</p>
      </div>
      <div className="confirmation-card-right">
        <p>
          {' '}
          Rp. {[orderList.food.price * orderList.quantity].toLocaleString()}
        </p>
      </div>
    </div>
  );
};
