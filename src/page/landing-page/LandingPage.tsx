import './LandingPage.css';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export const LandingPage = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  return (
    <div className="lpContainer">
      <div className="lpLogo">
        <img src={logo} alt="" />
      </div>
      <div className="lpWellcome">
        <p>Wellcome to</p>
        <p>Michael Garden App</p>
      </div>
      <div className="lpButtonContainer">
        <Link to="/guest-login">
          <button>I am in restaurant</button>
        </Link>
        <button>Make reservation</button>
      </div>
    </div>
  );
};
