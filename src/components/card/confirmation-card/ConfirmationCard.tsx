import { OrderListDTO } from "../../../DTO/OrderListDTO";
import "./ConfirmationCard.css";

type orderList = {
  orderList: OrderListDTO;
};

export const ConfirmationCard = ({ orderList }: orderList) => {
  return (
    <div className="confirmation-card-container">
      <div className="confirmation-card-left">
        <p>{orderList.name}</p>
        <p>{orderList.quantity} item</p>
        <p>Notes: {orderList.note}</p>
      </div>
      <div className="confirmation-card-right">
        <p> Rp. {orderList.price.toLocaleString()}</p>
      </div>
    </div>
  );
};
