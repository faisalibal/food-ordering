import React from 'react';

type button = {
  label: string;
  onClick: () => void;
  onSubmit?: () => void;
  style?: React.CSSProperties;
};
export const PrimaryButton = ({ label, onClick, onSubmit, style }: button) => {
  return (
    <button
      style={style}
      onClick={onClick}
      className="w-full bg-primary-500 rounded-[16px] shadow-md py-3 text-lg text-[#ffffff] font-semibold"
    >
      {label}
    </button>
  );
};

type statusButton = {
  status: string;
};

export const StatusOrderBUtton = ({ status }: statusButton) => {
  return (
    <button
      className="text-white py-1 px-2 rounded-lg text-[11px] shadow-md flex capitalize"
      style={{
        background: `${
          status === 'on payment'
            ? '#e96969'
            : status === 'cooking'
            ? '#ceb548'
            : status === 'being served'
            ? '#65b2df'
            : status === 'served'
            ? '#1fff50'
            : ''
        }`,
      }}
    >
      {status}
    </button>
  );
};
