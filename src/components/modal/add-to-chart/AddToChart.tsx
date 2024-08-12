import './AddToChart.css';
import {
  BsFillClockFill,
  BsFillHeartFill,
  BsFillTrashFill,
} from 'react-icons/bs';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { addChartModalFalse } from '../../../redux/AddChartModal';
import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
// import { OrderListDTO } from '../../../DTO/OrderListDTO';
// import {
//   fetchOrderList,
//   postOrderList,
//   updateOrderList,
// } from '../../../redux/OrderListSlice';
import useOnClickOutside from '../../../hook/useOnCLickOutside';
import chef from '../../../assets/icons/chef.png';
import cabai from '../../../assets/icons/cabai.png';
import {
  deleteFavourite,
  fetchFavourite,
  postFavourite,
} from '../../../redux/favouriteSlice';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  CreateItemOrderDTO,
  ItemOrderDTO,
  ItemStatus,
} from '../../../DTO/OrderListDTO';
import { setOrderItem, updateOrderItem } from '../../../redux/OrderListSlice';

type addToChart = {
  notify: (pesan: string) => void;
};

export const AddToChart = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[1];
  const pathTwo = location.pathname.split('/')[2];

  //======================Start Dispatch Redux=========================//
  const dispatch = useAppDispatch();
  const { foodId } = useAppSelector((state) => ({
    ...state.food,
  }));
  const { favourite } = useAppSelector((state) => ({
    ...state.favourite,
  }));
  const { orderList } = useAppSelector((state) => ({
    ...state.orderList,
  }));
  //=====================End Dispatch Redux===========================//

  //=====================Start State hook=============================//
  const bodyModal = useRef(null);
  const [counter, setCounter] = useState<number>(1);
  const [availableOrder, setAvailableOrder] = useState<boolean>(false);
  const [availableFavourite, setAvailableFavourite] = useState<boolean>(false);
  const [itemChart, setItemChart] = useState<ItemOrderDTO>({
    foodId: foodId?.id,
    food: foodId,
    statusId: 1,
    note: '',
    quantity: counter,
    orderId: 0,
  });
  //=====================End State hook=============================//

  //====================Start Handle Function=======================//

  const notify = (pesan: string) => {
    if (pesan === 'success') {
      toast.success('Food added to your favourite', {
        position: 'top-center',
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
      });
    }
    if (pesan === 'remove') {
      toast.warning('Food removed from your favourite', {
        position: 'top-center',
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        closeButton: false,
        icon: (
          <span className="bg-red-400 aspect-square rounded-full p-1 grid place-items-center">
            <BsFillTrashFill className="text-white text-sm " />
          </span>
        ),
      });
    }
  };

  const handleDispatchAddOrder = () => {
    const addOrder = async () => {
      if (availableOrder) {
        dispatch(updateOrderItem(itemChart));
      }
      if (availableOrder === false) {
        dispatch(setOrderItem(itemChart));
      }
      // dispatch(setOrderItem(itemChart));
      dispatch(addChartModalFalse());
    };
    addOrder();
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setItemChart((prev) => ({
      ...prev,
      [event.target.id]: event.target.value,
    }));
  };

  const handleCounter = (action: string) => {
    if (action === '-') {
      setCounter(counter - 1 != 0 ? counter - 1 : 1);
    }
    if (action === '+') {
      setCounter(counter + 1);
    }
  };

  const handleAddFavourite = () => {
    if (availableFavourite) {
      const handleFav = async () => {
        try {
          await dispatch(deleteFavourite(foodId.id));
          await dispatch(fetchFavourite());
          setAvailableFavourite(false);
          if (path === 'your-favourites' && !pathTwo) {
            setTimeout(() => {
              dispatch(addChartModalFalse());
            }, 100);
          }
          notify('remove');
        } catch (error) {
          console.log(error);
        }
      };
      handleFav();
    } else {
      const handleFav = async () => {
        try {
          await dispatch(postFavourite(foodId));
          await dispatch(fetchFavourite());
          setAvailableFavourite(true);
          notify('success');
        } catch (error) {
          console.log(error);
        }
      };
      handleFav();
    }
  };
  //====================End Handle Function=======================//

  //====================Start UseEffect===========================//
  useEffect(() => {
    setItemChart((prev) => ({
      ...prev,
      quantity: counter,
    }));
  }, [counter]);

  useLayoutEffect(() => {
    setItemChart({
      food: foodId,
      statusId: 1,
      foodId: foodId?.id,
      note: '',
      orderId: 0,
      quantity: counter,
    });
    const viewOptions = () => {
      const view = orderList.filter((item) => item.food.id === foodId?.id);
      if (view.length >= 1) {
        setAvailableOrder(true);
        const [data] = view;

        setCounter(data.quantity);
        setItemChart((prev) => ({
          ...prev,
          note: data.note,
        }));
      }
    };

    const heartFavourite = () => {
      const heart = favourite?.filter((item) => item.id === foodId?.id);
      if (heart?.length >= 1) {
        setAvailableFavourite(true);
      }
    };

    viewOptions();
    heartFavourite();
  }, []);
  //====================End UseEffect===========================//

  useOnClickOutside(bodyModal, () => dispatch(addChartModalFalse()));

  return (
    <>
      <ToastContainer
        toastStyle={{
          borderRadius: '12px',
          width: '300px',
          fontSize: '16px',
          fontWeight: 500,
        }}
        className="w-full flex flex-col items-center mt-5 gap-2"
        transition={Flip}
      />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.1,
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            delay: 0.3,
            duration: 0.1,
          },
        }}
        className="modal-chart"
      >
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
          className="modal-chart-container"
          ref={bodyModal}
        >
          <div
            className="modal-bar"
            onClick={() => dispatch(addChartModalFalse())}
          ></div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              <div
                style={{ position: 'absolute', right: '0px' }}
                onClick={() => handleAddFavourite()}
              >
                <BsFillHeartFill
                  style={
                    availableFavourite
                      ? { color: '#F19F5D', fontSize: '36px' }
                      : { color: '#fffcfa', fontSize: '36px' }
                  }
                />
              </div>
              <div className="modal-chart-image">
                <img src={foodId?.image} alt="chart-image" />
              </div>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
            >
              <div className="modal-chart-detail">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }}
                >
                  <p className="modal-chart-name">{foodId?.name}</p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginTop: '-3px',
                      }}
                    >
                      <img src={chef} alt="" />
                      <img src={cabai} alt="" />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <BsFillClockFill
                        style={{ color: '#80D33E', fontSize: '16px' }}
                      />
                      <p
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          fontWeight: '700',
                          fontSize: '12px',
                          color: 'white',
                        }}
                      >
                        4 - 10 Min
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="modal-chart-price">
                    Rp. {foodId?.price.toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="modal-chart-description">{foodId?.description}</p>
              <textarea
                className="modal-chart-note"
                placeholder="Add Notes.."
                id="note"
                onChange={handleTextAreaChange}
                defaultValue={availableOrder ? itemChart.note : ''}
              ></textarea>
            </div>
            <div className="modal-chart-button">
              <div className="counter-button">
                <button style={counter === 1 ? { background: '#dddddd' } : {}}>
                  <AiOutlineMinus onClick={() => handleCounter('-')} />
                </button>
                <p>{counter}</p>
                <button>
                  <AiOutlinePlus onClick={() => handleCounter('+')} />
                </button>
              </div>
              <button
                className="modal-chart-addtolist"
                onClick={() => handleDispatchAddOrder()}
              >
                {availableOrder ? 'Update Order' : ' Add to Order List'}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
