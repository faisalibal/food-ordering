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
      <div className="edit-profile-header">
        <span onClick={() => navigate(`/${path}`)}>
          <IoIosArrowBack />
        </span>
        <p>Edit Profile</p>
        <button>Save</button>
      </div>
      <div className="add-photo-container">
        <div>
          <p>Profile photo</p>
          <div>
            <img src={avatar} alt="avatar" />
          </div>
          <p>Add photo</p>
        </div>

        <p>Change profile photo</p>
      </div>
      <div className="edit-profile-form">
        <div>
          <label>Name</label>
          <input type="text" />
        </div>
        <div>
          <label>Username</label>
          <input type="text" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="tel" />
        </div>
        <div>
          <label>Name</label>
          <input type="text" />
        </div>
      </div>
    </div>
  );
};
