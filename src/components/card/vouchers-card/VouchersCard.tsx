import { IoTicket } from "react-icons/io5";
import "./VouchersCard.css";

export const VouchersCard = () => {
  return (
    <div className="voucher-card-container">
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div className="voucher-icon">
          <IoTicket />
        </div>
        <div className="voucher-detail">
          <span>BIRTHDAY10%</span>
          <span>Valid till 20 January 2022</span>
        </div>
      </div>
      <div className="voucher-usenow">
        <p>Use now</p>
      </div>
    </div>
  );
};
