import "./HeaderNav.css";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { InputSearch } from "../input/InputSearch";
import { useAppSelector } from "../../redux/hook";
import { Dispatch, SetStateAction, useState } from "react";

type search = {
  setSearch: Dispatch<SetStateAction<string>>;
};

export const HeaderNav = ({ setSearch }: search) => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { searchActive } = useAppSelector((state) => ({
    ...state.searchInput,
  }));

  return (
    <div className="header-nav-container">
      <span className="header-back" onClick={() => navigate(-1)}>
        <IoIosArrowBack onClick={() => navigate(0)} />
      </span>
      <span
        className="header-nav-name"
        style={searchActive ? { display: "none" } : {}}
      >
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
          <Link to="all-items">
            <button className="plus-button">
              <AiOutlinePlus />
            </button>
          </Link>
        ) : path === "your-favourites" ? (
          <InputSearch setSearch={setSearch} />
        ) : (
          ""
        )}
      </span>
    </div>
  );
};
