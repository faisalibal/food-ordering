import "./AccountPage.css";
import { BiEdit, BiCreditCard, BiHelpCircle, BiHistory } from "react-icons/bi";
import { CgLoadbarDoc } from "react-icons/cg";
import { HiOutlineTicket } from "react-icons/hi";
import { Navbar } from "../../components/navbar/Navbar";
import avatar from "../../assets/images/avatar.png";
import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";

export const AccountPage = () => {
  const [progress, useProgress] = useState<Number>(70);

  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className="account-container">
      <Navbar />
      <div className="account-information">
        <div className="account-information-left">
          <div className="avatar-image">
            <img src={avatar} alt="" />
          </div>
          <div className="account-info">
            <p>John Doe</p>
            <p>+62 81234567891</p>
          </div>
        </div>
        <div className="account-information-right">
          <span>Member</span>
          <Link to="edit-profile">
            <span className="edit-profile-nav">
              <BiEdit />
              <p>Edit profile</p>
            </span>
          </Link>
        </div>
      </div>
      <h4 className="account-bold">Complete your profile</h4>
      <div className="account-complete-container">
        <div className="progress-box">
          <div className="progress-container">
            <div
              className="progress-account"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="progress-number">{`${progress}`}%</p>
        </div>
        <p>Add profile picture</p>
        <p>Add basic information</p>
      </div>
      <h4 className="account-bold">Account</h4>
      <div className="card-menu-container">
        <span className="account-card-menu">
          <CgLoadbarDoc style={{ fontSize: "28px" }} />
          <p>Transaction history</p>
        </span>
        <span className="account-card-menu">
          <HiOutlineTicket style={{ fontSize: "28px" }} />
          <p>My voucher</p>
        </span>
        <span className="account-card-menu">
          <BiHistory style={{ fontSize: "28px" }} />
          <p>Reservation history</p>
        </span>
        <span className="account-card-menu">
          <BiCreditCard style={{ fontSize: "28px" }} />
          <p>Payment methods</p>
        </span>
        <span className="account-card-menu">
          <BiHelpCircle style={{ fontSize: "28px" }} />
          <p>Help</p>
        </span>
      </div>
      <button className="account-signout">Sign out</button>
    </div>
  );
};
