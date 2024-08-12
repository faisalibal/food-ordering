import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const AccountInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  return (
    <div>
      <div className="edit-profile-header relative w-full">
        <span
          onClick={() => navigate(`/account`)}
          className="absolute left-0"
          style={{ top: "-6px" }}
        >
          <IoIosArrowBack />
        </span>
        <p className="w-full text-center">Edit Profile</p>
        <button className="text-sm absolute right-0" style={{ top: "-2px" }}>
          Save
        </button>
      </div>
    </div>
  );
};
export default AccountInfo;
