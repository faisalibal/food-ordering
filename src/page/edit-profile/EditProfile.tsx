import { IoIosArrowBack } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/avatar.png";
import "./EditProfile.css";

export const EditProfile = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const navigate = useNavigate();

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header relative w-full">
        <span
          onClick={() => navigate(`/${path}`)}
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
      <div className="add-photo-container flex items-center gap-4 mt-3">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-semibold">Profile photo</p>
          <div className="w-16 h-16 overflow-hidden rounded-full">
            <img
              src={avatar}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs">Add photo</p>
        </div>

        <p className="text-xs">Change profile photo</p>
      </div>
      <div className="edit-profile-form flex flex-col gap-4 mt-5">
        <div className="flex flex-col gap-1">
          <label className="text-xs">Name</label>
          <input type="text" className="border-b-2 outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs">Username</label>
          <input type="text" className="border-b-2 outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs">Password</label>
          <input type="password" className="border-b-2 outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs">Email</label>
          <input type="email" className="border-b-2 outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs">Phone Number</label>
          <input type="tel" className="border-b-2 outline-none" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs">Birthdate</label>
          <input
            type="date"
            className="border-b-2 outline-none w-full bg-none pt-2 rounded-sm pr-2"
          />
        </div>
      </div>
    </div>
  );
};
