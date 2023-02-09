import React, { useState } from 'react';
import { HeaderNav } from '../../components/header-nav/HeaderNav';
import { IoIosArrowBack } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import qrcode from '../../assets/images/qrcode.png';
import table1 from '../../assets/images/table1.png';
import table2 from '../../assets/images/table2.png';

export const PaymentReceipt = () => {
  const navigate = useNavigate();
  const [tabActive, setTabActive] = useState<string>('total');

  return (
    <div className="p-5 flex flex-col items-center w-full gap-3">
      <div className="relative  flex flex-col items-center w-full mb-5">
        <p className="font-semibold text-lg">Payment Receipt</p>
        <IoIosArrowBack
          className="absolute top-1 left-2 text-[24px]"
          onClick={() => navigate('/order-list/confirm-order')}
        />
      </div>
      <div className="w-full flex flex-col gap-2 text-sm">
        <div className="w-full">
          <hr className="w-full border-dotted border-gray-400" />
        </div>
        <div className="flex justify-between">
          <p className="font-bold ">Date</p>
          <p className="font-medium">01 January 2022, 15:00 WIB</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold ">Payment method</p>
          <p className="font-medium">Pay to cashier</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold ">Order Id</p>
          <p className="font-medium">123ABC</p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold ">Table No.</p>
          <p className="font-medium">20</p>
        </div>
        <div className="w-full">
          <hr className="w-full border-dotted border-gray-400" />
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4 mt-2 mb-4">
        <div className="bg-gray-300 flex items-center rounded-lg p-1">
          <button
            className={`px-6 py-1 font-semibold rounded-md text-sm ${
              tabActive === 'total' ? 'bg-white' : ''
            }`}
            onClick={() => setTabActive('total')}
          >
            Total
          </button>
          <button
            className={`px-6 py-1 font-semibold rounded-md text-sm ${
              tabActive === 'byperson' ? 'bg-white' : ''
            }`}
            onClick={() => setTabActive('byperson')}
          >
            By person
          </button>
        </div>
        {tabActive === 'total' ? (
          <div className="flex flex-col w-full text-sm gap-1">
            <div className="flex justify-between w-full">
              <span>
                <p className="font-bold">Nasi Goreng</p>
                <p className="text-[11px] text-gray-500">2 items</p>
              </span>
              <p className="font-medium">Rp. 70.000</p>
            </div>
            <div className="flex justify-between w-full">
              <span>
                <p className="font-bold">Iced Tea</p>
                <p className="text-[11px] text-gray-500">2 items</p>
              </span>
              <p className="font-medium">Rp. 40.000</p>
            </div>
            <div className="w-full mt-4">
              <hr className="w-full border-dotted border-gray-400" />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <img src={table1} alt="avatar" className="w-[40px] h-[40px]" />
                <span className="flex flex-col leading-4 tracking-wide">
                  <p className="font-semibold text-[16px]">John Doe</p>
                  <i className="text-[12px] text-gray-400">1x Nasi Goreng</i>
                  <i className="text-[12px] text-gray-400">1x Iced Tea</i>
                </span>
              </div>
              <div className="flex flex-col leading-4 tracking-wide text-right">
                <p className="font-semibold text-[16px]">Rp. 55.000</p>
                <p className="text-[12px] text-gray-400">Rp.25.000</p>
                <p className="text-[12px] text-gray-400">Rp. 25.000</p>
              </div>
            </div>
            <div className="w-full mt-3">
              <div className="flex justify-between text-sm">
                <p className="font-semibold">Tax</p>
                <p className="font-medium">Rp. 5.500</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="font-semibold">Sub Total</p>
                <p className="font-medium">Rp. 60.500</p>
              </div>
            </div>
            <div className="w-full mt-4">
              <hr className="w-full border-dotted border-gray-400" />
            </div>
            <div className="flex justify-between mt-2">
              <div className="flex gap-2">
                <img src={table1} alt="avatar" className="w-[40px] h-[40px]" />
                <span className="flex flex-col leading-4 tracking-wide">
                  <p className="font-semibold text-[16px]">John Doe</p>
                  <i className="text-[12px] text-gray-400">1x Nasi Goreng</i>
                  <i className="text-[12px] text-gray-400">1x Iced Tea</i>
                </span>
              </div>
              <div className="flex flex-col leading-4 tracking-wide text-right">
                <p className="font-semibold text-[16px]">Rp. 55.000</p>
                <p className="text-[12px] text-gray-400">Rp.25.000</p>
                <p className="text-[12px] text-gray-400">Rp. 25.000</p>
              </div>
            </div>
            <div className="w-full mt-3">
              <div className="flex justify-between text-sm">
                <p className="font-semibold">Tax</p>
                <p className="font-medium">Rp. 5.500</p>
              </div>
              <div className="flex justify-between text-sm">
                <p className="font-semibold">Sub Total</p>
                <p className="font-medium">Rp. 60.500</p>
              </div>
            </div>
            <div className="w-full mt-4">
              <hr className="w-full border-dotted border-gray-400" />
            </div>
          </div>
        )}
      </div>
      {tabActive === 'total' ? (
        <div className="w-full -mt-3">
          <div className="flex flex-col w-full text-sm gap-1">
            <div className="flex justify-between w-full">
              <p className="font-bold">Sub total</p>
              <p className="font-medium">Rp. 110.000</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="font-bold">Tax</p>
              <p className="font-medium">Rp. 11.000</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="font-bold">Discount (10%)</p>
              <p className="font-semibold">-Rp. 12.000</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="font-bold">Total</p>
              <p className="font-semibold">Rp. 108.900</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full -mt-3">
          <div className="flex flex-col w-full text-sm gap-1">
            <div className="flex justify-between w-full">
              <p className="font-bold">Discount (10%)</p>
              <p className="font-semibold">-Rp. 12.000</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="font-bold">Total</p>
              <p className="font-semibold">Rp. 108.900</p>
            </div>
          </div>
        </div>
      )}

      <div className="w-full">
        <hr className="w-full border-dotted border-gray-400" />
      </div>
      <div className="w-full flex flex-col items-center">
        <p className="font-semibold text-[14px]">
          Show this barcode to the cashier for payment
        </p>
        <img src={qrcode} alt="qrcode" className="w-[130px] h-[130px]" />
      </div>
    </div>
  );
};
