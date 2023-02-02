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
      className="w-full bg-primary rounded-[16px] shadow-md py-3 text-lg text-[#ffffff] font-semibold"
    >
      {label}
    </button>
  );
};
