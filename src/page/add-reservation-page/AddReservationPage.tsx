import './AddReservationPage.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { ReservationDTO } from '../../DTO/ReservationDTO';
import { apiJsonServer } from '../../config/axios';
import { AnimatePresence } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { BookingConfirmation } from '../../components/modal/booking-confirmation/BookingConfirmation';
import { bookingConfirmationModalTrue } from '../../redux/bookingConfirmation';
import { HelperDate } from '../../helper/HelperDate';
import { fetchReservation } from '../../redux/reservationSlice';

export const AddReservationPage = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState([]);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();

  const { bookingConfirmationModal } = useAppSelector((state) => ({
    ...state.bookingConfirmation,
  }));

  const { reservationData, loading, error } = useAppSelector((state) => ({
    ...state.reservation,
  }));
  const dispatch = useAppDispatch();

  const [reservation, setReservation] = useState<ReservationDTO>({
    id: reservationData.length + 2,
    name: '',
    phone: '',
    date: date.toString(),
    time: '00:00',
    pax: 1,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReservation((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleTime = (item: string) => {
    const dateChoice = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    const today = `${
      new Date().getMonth() + 1
    }-${new Date().getDate()}-${new Date().getFullYear()}`;
    if (today === dateChoice) {
      if (`${item}` > `${new Date().getHours()}:${new Date().getMinutes()}`) {
        setReservation((prev) => ({
          ...prev,
          time: item,
        }));
      } else {
        return '';
      }
    }
    setReservation((prev) => ({
      ...prev,
      time: item,
    }));
  };

  const handlePaxPlus = () => {
    setReservation((prev) => ({
      ...prev,
      pax: prev.pax++,
    }));
  };

  const handlePaxMin = () => {
    setReservation((prev) => ({
      ...prev,
      pax: prev.pax--,
    }));
  };

  const buttonBooking = (time: string) => {
    const dateChoice = `${
      date.getMonth() + 1
    }-${date.getDate()}-${date.getFullYear()}`;
    const today = `${
      new Date().getMonth() + 1
    }-${new Date().getDate()}-${new Date().getFullYear()}`;

    let className = '';
    if (reservation.time === time) {
      className = 'active-time';
    }
    if (dateChoice === today) {
      if (`${time}` < `${new Date().getHours()}:${new Date().getMinutes()}`) {
        className = 'pass-time';
      }
    }
    return className;
  };

  useLayoutEffect(() => {
    const getTime = async () => {
      try {
        const response = await apiJsonServer.get('/time');
        setTime(response.data);
      } catch (error) {
        console.log('error');
      }
    };
    dispatch(fetchReservation());
    getTime();
  }, []);

  useEffect(() => {
    setReservation((prev) => ({
      ...prev,
      date: HelperDate(date.toString()),
    }));
  }, [date]);

  console.log(reservation);

  return (
    <>
      <AnimatePresence>
        {bookingConfirmationModal && (
          <BookingConfirmation reservation={reservation} />
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
        <div className="res-input-container">
          <div>
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="+62***"
              onChange={handleChange}
              id="phone"
            />
          </div>
          <div>
            <label>Name</label>
            <input
              type="text"
              placeholder="Your name"
              onChange={handleChange}
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
            {time.map((item, index) => (
              <button
                key={index}
                onClick={() => handleTime(item)}
                className={buttonBooking(item)}
              >
                {item}
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
              className={reservation.pax <= 1 ? 'res-min' : 'res-minus'}
              onClick={() => handlePaxMin()}
              disabled={reservation.pax === 1}
            >
              <AiOutlineMinus style={{ color: 'white', fontSize: '14px' }} />
            </button>
            <p>{reservation.pax} Pax</p>
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
