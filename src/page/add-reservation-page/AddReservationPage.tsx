import './AddReservationPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { baseURL } from '../../config/axios';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { BookingConfirmation } from '../../components/modal/booking-confirmation/BookingConfirmation';
import { bookingConfirmationModalTrue } from '../../redux/bookingConfirmation';
import { HelperDate } from '../../helper/HelperDate';
import { fetchReservation } from '../../redux/reservationSlice';
import { PhoneCodeDTO } from '../../DTO/Users';
import Select from 'react-select';
import { PhoneInput } from '../../components/input/PhoneInput';
import { TimeDto } from '../../DTO/ReservationDTO';

export const AddReservationPage = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [startDate, setStartDate] = useState(new Date());
  const [phoneCodeData, setPhoneCodeData] = useState<PhoneCodeDTO[]>();
  const [time, setTime] = useState<TimeDto[]>([]);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const { bookingConfirmationModal } = useAppSelector((state) => ({
    ...state.bookingConfirmation,
  }));

  const dispatch = useAppDispatch();

  // const [reservation, setReservation] = useState<ReservationDTO>({
  //   id: reservationData?.length + 2,
  //   name: '',
  //   phone: '',
  //   date: date.toString(),
  //   time: '00:00',
  //   pax: 1,
  // });

  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [timeReservation, setTimeReservation] = useState<string>('');
  const [pax, setPax] = useState<number>(1);
  const [countryCode, setCountryCode] = useState<string | undefined>('+62');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setReservation((prev) => ({
  //     ...prev,
  //     [event.target.id]: event.target.value,
  //   }));
  // };

  const handleTime = (item: string) => {
    const dateChoice = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    const today = `${
      new Date().getMonth() + 1
    }-${new Date().getDate()}-${new Date().getFullYear()}`;
    if (today === dateChoice) {
      if (`${item}` > `${new Date().getHours()}:${new Date().getMinutes()}`) {
        setTimeReservation(item);
      } else {
        return '';
      }
    }
    setTimeReservation(item);
  };

  const handlePaxPlus = () => {
    setPax(pax + 1);
  };

  const handlePaxMin = () => {
    setPax(pax - 1);
  };

  const buttonBooking = (time: string) => {
    const dateChoice = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    const today = `${
      new Date().getMonth() + 1
    }-${new Date().getDate()}-${new Date().getFullYear()}`;

    let className = '';
    if (timeReservation === time) {
      className = 'active-time';
    }
    if (dateChoice === today) {
      if (`${time}` < `${new Date().getHours()}:${new Date().getMinutes()}`) {
        className = 'pass-time';
      }
    }
    return className;
  };

  useEffect(() => {
    const getPhoneCode = async () => {
      try {
        const response = await baseURL.get('/phone-code');
        setPhoneCodeData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPhoneCode();
  }, []);

  useLayoutEffect(() => {
    const getTime = async () => {
      try {
        const response = await baseURL.get('/times');
        setTime(response.data);
      } catch (error) {
        console.log('error');
      }
    };
    dispatch(fetchReservation());
    getTime();
  }, []);

  const DropdownIndicator = () => null;

  return (
    <>
      <AnimatePresence>
        {bookingConfirmationModal && (
          <BookingConfirmation
            date={date}
            name={name}
            pax={pax}
            phoneNumber={phoneNumber}
            timeReservation={timeReservation}
            countryCode={countryCode}
          />
        )}
      </AnimatePresence>
      <div className="res-container">
        <div className="res-header">
          <span
            onClick={() => navigate(`/${path === 'reservation' ? path : ''}`)}
          >
            <IoIosArrowBack style={{ fontSize: '20px', marginLeft: '-1px' }} />
          </span>
          <span>
            <p>New Reservation</p>
          </span>
        </div>
        <div className="w-full flex flex-col gap-2">
          <div>
            <label>Phone Number</label>
            <div className="flex gap-1">
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: '60px',
                  }),
                  menu: (baseStyles, state) => ({
                    ...baseStyles,
                    width: '270px', // Ubah lebar dropdown sesuai kebutuhan Anda
                  }),
                }}
                options={phoneCodeData}
                getOptionLabel={(option) =>
                  `${option.dial_code} ${option.name}`
                }
                getOptionValue={(option) => option.dial_code}
                onChange={(selectedOption) => {
                  setCountryCode(selectedOption?.dial_code);
                  // console.log(selectedOption);
                }}
                placeholder="+62"
                components={{ DropdownIndicator }}
                formatOptionLabel={(option, { context }) =>
                  context === 'menu'
                    ? `${option.dial_code} ${option.name}`
                    : option.dial_code
                }
              />

              {/* <input
                type="text"
                placeholder="+62***"
                onChange={handleChange}
                id="phone"
              /> */}
              <PhoneInput
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event?.target.value)
              }
              className={`w-full px-2 py-2 border rounded-md transition-all duration-300 outline-none hover:border-blue-500  focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
              id="name"
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div className="res-date-picker">
            <h3>Date & Time</h3>
            <div
              className="date-tes"
              style={{ display: 'flex', width: '100%' }}
            >
              <DatePicker
                minDate={new Date()}
                onChange={(date) => setDate(new Date(date || new Date()))}
                startDate={startDate}
                inline
              />
            </div>
          </div>
          <div className="res-time-button">
            {time?.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleTime(item.time);
                }}
                className={buttonBooking(item.time)}
              >
                {item.time}
              </button>
            ))}
          </div>
        </div>
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div className="res-pax">
            <h3>Pax</h3>
            <div className="res-available-seat">
              <p>Available seats: </p>
              <p>20 pax</p>
            </div>
          </div>
          <div className="res-count-pax">
            <button
              className={pax <= 1 ? 'res-min' : 'res-minus'}
              onClick={() => handlePaxMin()}
              disabled={pax === 1}
            >
              <AiOutlineMinus style={{ color: 'white', fontSize: '14px' }} />
            </button>
            <p>{pax} Pax</p>
            <button onClick={() => handlePaxPlus()}>
              <AiOutlinePlus style={{ color: 'white', fontSize: '14px' }} />
            </button>
          </div>
        </div>
        <div className="res-button">
          <button
            onClick={() => navigate(`/${path === 'reservation' ? path : ''}`)}
          >
            Cancel
          </button>
          <button
            className="res-submit"
            onClick={() => dispatch(bookingConfirmationModalTrue())}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
