import './OrderCard.css';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
// import { OrderListDTO } from '../../../DTO/OrderListDTO';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
// import {
//   deleteOrderList,
//   fetchOrderList,
//   updateOrderList,
// } from '../../../redux/OrderListSlice';
import {
  addChartModalTrue,
  addWaitersDrawerItemFalse,
  addWaitersDrawerItemTrue,
  addWaitersModalItemFalse,
  addWaitersModalItemTrue,
} from '../../../redux/AddChartModal';
import { fetchFoodId } from '../../../redux/FoodSlice';
import { StatusOrderBUtton } from '../../button';
import { ItemOrderDTO } from '../../../DTO/OrderListDTO';
import {
  fetchItemStatus,
  removeOrderItem,
  updateOrderItem,
} from '../../../redux/OrderListSlice';
import { Modal } from 'rsuite';
import useOnClickOutside from '../../../hook/useOnCLickOutside';
import { baseURL } from '../../../config/axios';
import { BiArrowToRight } from 'react-icons/bi';
import {
  fetchWaitersOrder,
  fetchWaitersOrderItem,
} from '../../../redux/WaitersSlice';

type orderList = {
  orderList: ItemOrderDTO;
  index?: number;
  setHelperUpdateCount?: React.Dispatch<SetStateAction<boolean>>;
  helperUpdateCount?: boolean;
};

export const OrderCard = ({
  orderList,
  index,
  setHelperUpdateCount,
  helperUpdateCount,
}: orderList) => {
  const [quantity, setQuantity] = useState<number>(orderList?.quantity || 0);
  const [note, setNote] = useState<string>(orderList?.note || '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTotalPrice(orderList?.food.price * quantity);
    if (quantity != orderList.quantity) {
      const updateValue = {
        food: orderList.food,
        foodId: orderList.foodId,
        note: note,
        quantity: quantity,
      };

      const updateOrder = () => {
        dispatch(updateOrderItem(updateValue));
        if (setHelperUpdateCount) {
          setHelperUpdateCount(!helperUpdateCount);
        }
      };
      updateOrder();
    }
  }, [quantity]);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    setQuantity(quantity - 1);
  };

  const handleDispatch = () => {
    const deleteOrder = async () => {
      try {
        dispatch(removeOrderItem(index));
      } catch (error) {
        console.log(error);
      }
    };
    deleteOrder();
  };

  const handleModalDispatch = () => {
    const modalHandle = async () => {
      await dispatch(fetchFoodId(orderList.foodId));
      dispatch(addChartModalTrue());
    };
    modalHandle();
  };

  const [totalPrice, setTotalPrice] = useState<number>(
    orderList?.food?.price * orderList?.quantity
  );

  return (
    <div className="order-card-container">
      <div className="container-image-detail">
        <div className="order-image">
          <img src={orderList?.food?.image} alt="order card" />
        </div>
        <div className="order-detail">
          <div>
            <h4>{orderList?.food?.name}</h4>
            <span style={{}}>
              Notes :{' '}
              {orderList?.note && orderList?.note?.length < 1 ? '-' : ''}
              <p
                style={{
                  marginTop: '-4px',
                  maxHeight: '40px',
                  minHeight: '10px',
                  overflow: 'scroll',
                  marginBottom: '6px',
                }}
              >
                {orderList?.note}
              </p>
            </span>
          </div>
          <button
            className="catatan-button"
            onClick={() => handleModalDispatch()}
          >
            <FiEdit style={{ color: 'var(--font-primary)' }} />
            <p>Catatan</p>
          </button>
        </div>
      </div>
      <div className="order-price">
        <p>Rp. {totalPrice.toLocaleString()}</p>
        <div className="order-card-counter">
          {quantity <= 1 ? (
            <button onClick={() => handleDispatch()}>
              <BsTrashFill />
            </button>
          ) : (
            <button onClick={() => handleMinus()}>
              <AiOutlineMinus />
            </button>
          )}

          <p>{quantity}</p>
          <button onClick={() => handlePlus()}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ConfirmOrderCard = ({ orderList }: orderList) => {
  const [quantity, setQuantity] = useState<number>(orderList?.quantity || 0);
  const [note, setNote] = useState<string>(orderList?.note || '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTotalPrice(orderList?.food.price * quantity);
    if (quantity != orderList.quantity) {
      const updateValue = {
        id: orderList.id,
        kategory: orderList.food.category,
        name: orderList.food.name,
        price: orderList.food.name,
        quantity: quantity,
        note: note,
        image: orderList.food.image,
      };
      // const updateOrder = async () => {
      //   await dispatch(updateOrderList(updateValue));
      //   await dispatch(fetchOrderList());
      // };
      // updateOrder();
    }
  }, [quantity]);

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };
  const handleMinus = () => {
    setQuantity(quantity - 1);
  };

  const handleDispatch = () => {
    const deleteOrder = async () => {
      try {
        // await dispatch(deleteOrderList(orderList?.id || ''));
        // await dispatch(fetchOrderList());
      } catch (error) {
        console.log(error);
      }
    };
    deleteOrder();
  };

  const handleModalDispatch = () => {
    const modalHandle = async () => {
      // await dispatch(fetchFoodId(orderList.id));
      dispatch(addChartModalTrue());
    };
    modalHandle();
  };

  const [totalPrice, setTotalPrice] = useState<number>(
    orderList?.food.price * orderList?.quantity
  );

  return (
    <div className="order-card-container">
      <div className="container-image-detail">
        <div className="order-image">
          <img src={orderList?.food.image} alt="order card" />
        </div>
        <div className="order-detail">
          <div>
            <h4>{orderList?.food.name}</h4>
            <p className="text-xs text-white font-semibold">
              Quantity : {orderList.quantity}
            </p>
            <span style={{}}>
              Notes : {orderList?.note && orderList?.note.length < 1 ? '-' : ''}
              <p
                style={{
                  marginTop: '-4px',
                  maxHeight: '40px',
                  minHeight: '10px',
                  overflow: 'scroll',
                  marginBottom: '6px',
                }}
              >
                {orderList?.note}
              </p>
            </span>
          </div>
        </div>
      </div>
      <div className="order-price">
        <p>Rp. {totalPrice.toLocaleString()}</p>
        {/* <StatusOrderBUtton status="being served" /> */}
        <button
          className={`flex text-[12px] font-semibold text-white rounded-md py-[2px] px-2 ${
            orderList.statusId === 1
              ? 'bg-red-400'
              : orderList.statusId === 2
              ? 'bg-amber-600'
              : orderList.statusId === 3
              ? 'bg-cyan-400'
              : orderList.statusId === 4
              ? 'bg-violet-400'
              : orderList.statusId === 5
              ? 'bg-green-400'
              : ''
          }`}
        >
          {orderList.status?.status}
        </button>
      </div>
    </div>
  );
};

export const WaitersOrderCard = ({ orderList }: orderList) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const bodyModal = useRef<HTMLDivElement>(null);
  const { statusItem } = useAppSelector((state) => ({ ...state.orderList }));

  const handleNextStep = async () => {
    try {
      const res = await baseURL.put(
        `item-order/status/${orderList.id}`,
        { statusId: 5 },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // dispatch(fetchWaitersOrder());
      // dispatch(fetchWaitersOrderItem());
      // dispatch(addWaitersDrawerItemFalse());
    } catch (error) {
      console.log(error);
    }
  };

  useOnClickOutside(bodyModal, () => setOpen(false));
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="bg-white w-[calc(100vw-10vw)] p-4 rounded shadow"
            ref={bodyModal}
          >
            <div className="mt-4">
              <div
                className="flex flex-col bg-white w-full p-4 rounded-md items-center"
                onClick={() => setOpen(true)}
              >
                <div className="container-image-detail flex flex-col items-center w-full">
                  <div className="order-image">
                    <img src={orderList?.food?.image} alt="order card" />
                  </div>
                  <div className="order-detail w-full">
                    <div style={{ color: 'black' }}>
                      <h4 style={{ color: 'black' }}>{orderList?.food.name}</h4>
                      <p
                        className="text-xs text-white font-semibold"
                        style={{ color: 'black' }}
                      >
                        Quantity : {orderList.quantity}
                      </p>
                      <span style={{ color: 'black' }}>
                        Notes :{' '}
                        {orderList?.note && orderList?.note.length < 1
                          ? '-'
                          : ''}
                        <p
                          style={{
                            marginTop: '-4px',
                            maxHeight: '40px',
                            minHeight: '10px',
                            overflow: 'scroll',
                            marginBottom: '6px',
                            color: 'black',
                          }}
                        >
                          {orderList?.note}
                        </p>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="order-price">
                  <button
                    className={`flex text-[12px] font-semibold text-white rounded-md py-[2px] px-2 ${
                      orderList.statusId === 1
                        ? 'bg-red-400'
                        : orderList.statusId === 2
                        ? 'bg-amber-600'
                        : orderList.statusId === 3
                        ? 'bg-cyan-400'
                        : orderList.statusId === 4
                        ? 'bg-violet-400'
                        : orderList.statusId === 4
                        ? 'bg-green-400'
                        : ''
                    }`}
                  >
                    {orderList.status?.status}
                  </button>
                </div>
              </div>
              <select
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                defaultValue={orderList?.statusId}
              >
                <option value="" disabled selected>
                  Select an option
                </option>
                {statusItem?.map((item, index) => (
                  <option value={item.id}>{item.status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
      <div className="order-card-container w-full">
        <div className="container-image-detail" onClick={() => setOpen(true)}>
          <div className="order-image">
            <img src={orderList?.food?.image} alt="order card" />
          </div>
          <div className="order-detail">
            <div>
              <h4>{orderList?.food.name}</h4>
              <p className="text-xs text-white font-semibold">
                Quantity : {orderList.quantity}
              </p>
              <span style={{}}>
                Notes :{' '}
                {orderList?.note && orderList?.note.length < 1 ? '-' : ''}
                <p
                  style={{
                    marginTop: '-4px',
                    maxHeight: '40px',
                    minHeight: '10px',
                    overflow: 'scroll',
                    marginBottom: '6px',
                  }}
                >
                  {orderList?.note}
                </p>
              </span>
            </div>
          </div>
        </div>
        <div className="order-price">
          <button
            className={`flex text-[12px] font-semibold text-white rounded-md py-[2px] px-2 ${
              orderList.statusId === 1
                ? 'bg-red-400'
                : orderList.statusId === 2
                ? 'bg-amber-600'
                : orderList.statusId === 3
                ? 'bg-cyan-400'
                : orderList.statusId === 4
                ? 'bg-violet-400'
                : orderList.statusId === 5
                ? 'bg-green-400'
                : ''
            }`}
            onClick={() => setOpen(true)}
          >
            {orderList.status?.status}
          </button>
          <button
            className="flex text-[12px] font-semibold text-white rounded-md py-[2px] px-2 bg-blue-400  items-center gap-1"
            onClick={handleNextStep}
          >
            <BiArrowToRight />
            Next step
          </button>
        </div>
      </div>
    </>
  );
};
