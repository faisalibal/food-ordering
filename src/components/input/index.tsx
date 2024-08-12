import { BiQrScan } from 'react-icons/bi';
import './index.css';

type DateInput = {
  label: string;
  onChange: () => void;
};

export const InputDate = ({ label, onChange }: DateInput) => {
  return (
    <div className="input-date-container">
      <label className="text-xs">{label}</label>
      <input
        type="date"
        id="date-container"
        className="border-b-2 outline-none w-full bg-none pt-2 rounded-sm pr-2 "
        onChange={(e) => onChange()}
      />
    </div>
  );
};

type inputField = {
  id?: string;
  label: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = ({
  id,
  label,
  placeholder,
  onChange,
}: inputField) => {
  return (
    <div className="flex flex-col items-start w-full">
      <label className="text-[16px] text-[#014A40] font-medium">{label}</label>
      <input
        type="text"
        className="bg-[#b8e6d2] rounded-[6px] outline-none w-full h-[42px] p-3 placeholder:text-gray-400"
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />
    </div>
  );
};

export const InputScanCode = ({
  id,
  label,
  placeholder,
  onChange,
}: inputField) => {
  return (
    <div className="flex flex-col items-start w-full gap-1 relative">
      <label className="text-[16px] text-[#014A40] font-medium">{label}</label>
      <input
        type="text"
        className="bg-[#b8e6d2] rounded-[6px] outline-none w-full h-[42px] p-3 placeholder:text-gray-400"
        placeholder={placeholder}
        onChange={onChange}
        id={id}
      />

      <BiQrScan className="absolute right-2 bottom-[5px] text-[32px]" />
    </div>
  );
};
