import "./HeaderNav.css";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";

export const HeaderNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <div className="header-nav-container">
      <span className="header-back" onClick={() => navigate(-1)}>
        <IoIosArrowBack onClick={() => navigate(0)} />
      </span>
      <span className="header-nav-name">
        <p>{path.split("-").join(" ")}</p>
      </span>
      <span>
        {path === "reservation" ? (
          <Link to="new-reservation">
            <button className="plus-button">
              <AiOutlinePlus />
            </button>
          </Link>
        ) : path === "order-list" ? (
          <Link to="/all-items">
            <button className="plus-button">
              <AiOutlinePlus />
            </button>
          </Link>
        ) : path === "all-items" ? (
          <BsSearch style={{ fontSize: "20px" }} />
        ) : path === "your-favourites" ? (
          <BsSearch style={{ fontSize: "20px" }} />
        ) : (
          ""
        )}
      </span>
    </div>
  );
};
