import { motion } from 'framer-motion';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/button';
import { InputField, InputScanCode } from '../../components/input';
import './GuestLoginPage.css';

export const GuestLoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#014a40] relative">
      <span
        onClick={() => navigate('/')}
        className="absolute left-3 top-3 w-8 h-8 bg-[#fffcfa] rounded-[50%] grid place-items-center text-[22px] "
      >
        <IoIosArrowBack />
      </span>
      <h2 className="font-semibold text-[36px] grid place-items-center m-auto pt-[15%] text-white">
        Welcome back <br />
        our beloved <br />
        Member!
      </h2>
      <motion.div
        initial={{
          transform: 'translateY(100%)',
        }}
        animate={{
          transform: 'translateY(0%)',
        }}
        exit={{
          transform: 'translateY(100%)',
        }}
        className="guest-login-container  pt-8 justify-between"
      >
        <div className="w-full">
          <InputField label="Phone Number" placeholder="" onChange={() => {}} />
          <InputField label="Name" placeholder="" onChange={() => {}} />
          <InputScanCode
            label="Unique code"
            placeholder=""
            onChange={() => {}}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <PrimaryButton label="Submit" onClick={() => navigate('/home')} />
          <p
            className="text-gray-400 text-[13px] h-[32px] flex items-center"
            onClick={() => navigate('/register')}
          >
            Log in as a member
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#014a40] relative">
      <span
        onClick={() => navigate('/register')}
        className="absolute left-3 top-3 w-8 h-8 bg-[#fffcfa] rounded-[50%] grid place-items-center text-[22px] "
      >
        <IoIosArrowBack />
      </span>
      <h2 className="font-semibold text-[36px] grid place-items-center m-auto pt-[15%] text-white w-[253px]">
        Login for reservation
      </h2>
      <motion.div
        initial={{
          transform: 'translateY(100%)',
        }}
        animate={{
          transform: 'translateY(0%)',
        }}
        exit={{
          transform: 'translateY(100%)',
        }}
        className="guest-login-container  pt-8 justify-between"
      >
        <div className="w-full">
          <InputField label="Username" placeholder="" onChange={() => {}} />
          <InputField label="Password" placeholder="" onChange={() => {}} />
        </div>
        <div className="w-full flex flex-col items-center">
          <PrimaryButton label="Submit" onClick={() => {}} />
          {/* <p className="text-gray-400 text-[13px] h-[32px] flex items-center">
            Log in as a member
          </p> */}
        </div>
      </motion.div>
    </div>
  );
};

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#014a40] relative">
      <span
        onClick={() => navigate('/guest-login')}
        className="absolute left-3 top-3 w-8 h-8 bg-[#fffcfa] rounded-[50%] grid place-items-center text-[22px] "
      >
        <IoIosArrowBack />
      </span>
      <h2 className="font-semibold text-[36px] grid place-items-center m-auto pt-[15%] text-white w-[282px]">
        Please register first before you book
      </h2>
      <motion.div
        initial={{
          transform: 'translateY(100%)',
        }}
        animate={{
          transform: 'translateY(0%)',
        }}
        exit={{
          transform: 'translateY(100%)',
        }}
        className="guest-login-container pt-8 justify-between"
      >
        <div className="w-full">
          <InputField label="Username" placeholder="" onChange={() => {}} />
          <InputField label="Password" placeholder="" onChange={() => {}} />
          <InputField label="Name" placeholder="" onChange={() => {}} />
          <InputField label="Phone Number" placeholder="" onChange={() => {}} />
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          <PrimaryButton label="Submit" onClick={() => {}} />
          <p
            className="text-gray-400 text-[13px] h-[32px] flex items-center"
            onClick={() => navigate('/login')}
          >
            I already have an account
          </p>
        </div>
      </motion.div>
    </div>
  );
};
