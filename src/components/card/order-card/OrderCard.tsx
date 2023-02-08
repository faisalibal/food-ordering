import './OrderCard.css';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { BsTrashFill } from 'react-icons/bs';
import { OrderListDTO } from '../../../DTO/OrderListDTO';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../redux/hook';
import {
  deleteOrderList,
  fetchOrderList,
  updateOrderList,
} from '../../../redux/OrderListSlice';
import { addChartModalTrue } from '../../../redux/AddChartModal';
import { fetchFoodId } from '../../../redux/FoodSlice';
import { StatusOrderBUtton } from '../../button';
import { OrderList } from '../../../page/order-list/OrderList';

type orderList = {
  orderList: OrderListDTO;
};

export const OrderCard = ({ orderList }: orderList) => {
  const [quantity, setQuantity] = useState<number>(orderList?.quantity || 0);
  const [note, setNote] = useState<string>(orderList?.note || '');
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTotalPrice(orderList?.price * quantity);
    if (quantity != orderList.quantity) {
      const updateValue = {
        id: orderList.id,
        kategory: orderList.kategory,
        name: orderList.name,
        price: orderList.price,
        quantity: quantity,
        note: note,
        image: orderList.image,
      };
      const updateOrder = async () => {
        await dispatch(updateOrderList(updateValue));
        await dispatch(fetchOrderList());
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
        await dispatch(deleteOrderList(orderList?.id || ''));
        await dispatch(fetchOrderList());
      } catch (error) {
        console.log(error);
      }
    };
    deleteOrder();
  };

  const handleModalDispatch = () => {
    const modalHandle = async () => {
      await dispatch(fetchFoodId(orderList.id));
      dispatch(addChartModalTrue());
    };
    modalHandle();
  };

  const [totalPrice, setTotalPrice] = useState<number>(
    orderList?.price * orderList?.quantity
  );

  return (
    <div className="order-card-container">
      <div className="container-image-detail">
        <div className="order-image">
          <img src={orderList?.image} alt="order card" />
        </div>
        <div className="order-detail">
          <div>
            <h4>{orderList?.name}</h4>
            <span style={{}}>
              Notes : {orderList?.note.length < 1 ? '-' : ''}
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
    setTotalPrice(orderList?.price * quantity);
    if (quantity != orderList.quantity) {
      const updateValue = {
        id: orderList.id,
        kategory: orderList.kategory,
        name: orderList.name,
        price: orderList.price,
        quantity: quantity,
        note: note,
        image: orderList.image,
      };
      const updateOrder = async () => {
        await dispatch(updateOrderList(updateValue));
        await dispatch(fetchOrderList());
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
        await dispatch(deleteOrderList(orderList?.id || ''));
        await dispatch(fetchOrderList());
      } catch (error) {
        console.log(error);
      }
    };
    deleteOrder();
  };

  const handleModalDispatch = () => {
    const modalHandle = async () => {
      await dispatch(fetchFoodId(orderList.id));
      dispatch(addChartModalTrue());
    };
    modalHandle();
  };

  const [totalPrice, setTotalPrice] = useState<number>(
    orderList?.price * orderList?.quantity
  );

  return (
    <div className="order-card-container">
      <div className="container-image-detail">
        <div className="order-image">
          <img src={orderList?.image} alt="order card" />
        </div>
        <div className="order-detail">
          <div>
            <h4>{orderList?.name}</h4>
            <p className="text-xs text-white font-semibold">
              Quantity : {orderList.quantity}
            </p>
            <span style={{}}>
              Notes : {orderList?.note.length < 1 ? '-' : ''}
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
        <StatusOrderBUtton status="being served" />
      </div>
    </div>
  );
};
