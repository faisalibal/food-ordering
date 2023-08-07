import './LandingPage.css';
import logo from '../../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';

export const LandingPage = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const navigate = useNavigate();
  return (
    <div className="lpContainer">
      <div className="lpLogo">
        <img src={logo} alt="" />
      </div>
      <div className="lpWellcome">
        <p>Welcome to</p>
        <p>Michael's Garden App</p>
      </div>
      <div className="lpButtonContainer">
        <Link to="/choice-login-type">
          <button>I am in restaurant</button>
        </Link>
        <button onClick={() => navigate('/new-reservation')}>
          Make reservation
        </button>
      </div>
    </div>
  );
};
