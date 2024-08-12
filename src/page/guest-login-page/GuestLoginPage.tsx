import { motion } from 'framer-motion';
import { useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/button';
import { InputField, InputScanCode } from '../../components/input';
import logo from '../../assets/images/logo.png';
import './GuestLoginPage.css';
import { baseURL } from '../../config/axios';
import { ErrorModal } from '../../components/modal/error-modal/ErrorModal';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import {
  setErrorMessage,
  setErrorModalTrue,
} from '../../redux/confirmationModal';
import { PasswordInput } from '../../components/input/PasswordInput';
import {
  PhoneInput,
  PhoneInputRegistration,
} from '../../components/input/PhoneInput';
import { EmailInput } from '../../components/input/EmailInput';
import { FiLoader } from 'react-icons/fi';

export const GuestLoginPage = () => {
  const navigate = useNavigate();
  const [guestLogin, setguestLogin] = useState({
    name: null,
    phone_number: null,
  });
  const [uniqueCode, setUniqueCode] = useState<string>('');
  const { errorModal, errorMessage } = useAppSelector((state) => ({
    ...state.confirmation,
  }));
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setguestLogin((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleAddGuest = async () => {
    try {
      if (uniqueCode === null || uniqueCode.length === 0) {
        dispatch(setErrorMessage('Masukkan atau scan unique code'));
        dispatch(setErrorModalTrue());
      } else {
        const response = await baseURL.post(`/guest`, guestLogin);
        const table = await baseURL.get(`/tables/code/${uniqueCode}`);
        localStorage.setItem('table', JSON.stringify(table.data));
        localStorage.setItem('guest', JSON.stringify(response.data));
        navigate('/home');
      }
    } catch (error: any) {
      console.log(error);
      dispatch(setErrorMessage(error.response.data.message));
      dispatch(setErrorModalTrue());
    }
  };

  const handleChangeUniqueCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUniqueCode(event.target.value);
  };

  return (
    <>
      {errorModal && <ErrorModal />}
      <div className="w-screen h-screen bg-[#014a40] relative">
        <span
          onClick={() => navigate('/')}
          className="absolute left-3 top-3 w-8 h-8 bg-[#fffcfa] rounded-[50%] grid place-items-center text-[22px] "
        >
          <IoIosArrowBack />
        </span>
        <h2 className="font-semibold text-[28px] grid place-items-center m-auto pt-[15%] text-white px-5 text-center">
          Enter your name and table code for start order
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
            <InputField
              label="Phone Number"
              placeholder=""
              onChange={handleChange}
              id="phone_number"
            />
            <InputField
              label="Name"
              placeholder=""
              onChange={handleChange}
              id="name"
            />
            <InputScanCode
              label="Unique code"
              placeholder=""
              onChange={handleChangeUniqueCode}
              id="uniqueCode"
            />
          </div>
          <div className="w-full flex flex-col items-center gap-3">
            <PrimaryButton label="Submit" onClick={handleAddGuest} />
            <p
              className="text-gray-400 text-[13px] h-[32px] flex items-center"
              onClick={() => navigate('/login')}
            >
              Log in as a member
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export const ChoiceLoginType = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-[#014a40] relative grid place-items-center">
      <span
        onClick={() => navigate('/')}
        className="absolute left-3 top-3 w-8 h-8 bg-[#fffcfa] rounded-[50%] grid place-items-center text-[22px] "
      >
        <IoIosArrowBack />
      </span>
      <div className="lpLogo">
        <img src={logo} alt="" />
      </div>
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
        <div className="w-full flex flex-col items-center gap-4 h-[20vh]">
          <PrimaryButton
            label="Enter as Guest"
            onClick={() => navigate('/guest-login')}
          />
          <PrimaryButton
            label="Enter as Member"
            onClick={() => navigate('/login')}
          />
          {/* <p className="text-gray-400 text-[13px] h-[32px] flex items-center">
            Log in as a member
          </p> */}
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
        onClick={() => navigate('/')}
        className="absolute left-3 top-3 w-8 h-8 bg-[#fffcfa] rounded-[50%] grid place-items-center text-[22px] "
      >
        <IoIosArrowBack />
      </span>
      <h2 className="font-semibold text-[28px] grid place-items-center m-auto pt-[15%] text-white w-[253px] text-center">
        Login for start order
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
          <span className="text-gray-400 text-[13px] h-[32px] items-center mt-4 flex gap-3">
            Dont have an account?{'      '}
            <p className="text-blue-500" onClick={() => navigate('/register')}>
              Register now!!
            </p>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string | undefined>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailRequired, setEmailRequired] = useState<boolean>(false);

  console.log(name, password, email, phoneNumber, countryCode);

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await baseURL.post('/customer/register', {
        customer_name: name,
        password: password,
        email: email,
        phone_number: `${countryCode}${phoneNumber}`,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#014a40] relative">
      <span
        onClick={() => navigate('/')}
        className="absolute left-3 top-3 w-8 h-8 bg-[#fffcfa] rounded-[50%] grid place-items-center text-[22px] "
      >
        <IoIosArrowBack />
      </span>
      <h2 className="font-semibold text-[28px] grid place-items-center m-auto pt-[15%] text-white w-[282px]">
        Please register first before you order
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
        <div className="w-full flex flex-col gap-1">
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput
            password={password}
            labelPassword="Password"
            setPassword={setPassword}
            verify={false}
          />
          <InputField
            label="Name"
            placeholder="Input your name"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setName(event.target.value)
            }
          />
          <PhoneInputRegistration
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
          />
        </div>
        <div className="w-full flex flex-col items-center gap-3">
          {/* <PrimaryButton label="Submit" onClick={handleRegister} /> */}
          <button
            type="submit"
            className={`w-full relative px-4 py-2 text-white ${
              // isChecked === true &&
              emailRequired === true
                ? ' bg-primary-500 hover:bg-primary-600'
                : 'bg-gray-400  hover:bg-gray-400'
            }  rounded-[8px] shadow-md transition-colors duration-300 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-200 focus:ring-opacity-50 ${
              isLoading ? 'opacity-50 cursor-wait' : ''
            }`}
            disabled={
              isLoading === true ? true : emailRequired === true ? false : true
            }
          >
            {isLoading ? (
              <>
                <FiLoader className="inline-block animate-spin mr-2" />
                Wait
              </>
            ) : (
              'Submit'
            )}
          </button>
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
