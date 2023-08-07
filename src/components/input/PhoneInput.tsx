import React, { useEffect, useState } from 'react';
import { baseURL } from '../../config/axios';
import { PhoneCodeDTO } from '../../DTO/Users';
import Select from 'react-select';

type PhoneInput = {
  phoneNumber: string | undefined;
  setPhoneNumber: React.Dispatch<React.SetStateAction<any>>;
  setPhoneRequired?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PhoneInput = ({
  phoneNumber,
  setPhoneNumber,
  setPhoneRequired,
}: PhoneInput) => {
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { value } = e.target;
    let { value } = e.target;
    value = value.replace(/\D/g, ''); // hanya mengizinkan angka
    value = value.replace(/^0+/, ''); // menghapus leading zeros
    let processedPhoneNumber = value;
    // Check if the first character is 0
    if (value.charAt(0) === '0') {
      // Remove the first character if it is 0
      processedPhoneNumber = value.slice(1);
    }
    if (e.target.value === undefined) {
      setPhoneNumber(undefined);
      if (setPhoneRequired) {
        setPhoneRequired(false);
      }
    } else {
      setPhoneNumber(Number(processedPhoneNumber));
      if (setPhoneRequired) {
        setPhoneRequired(true);
      }
      setPhoneError('');
    }
  };
  const [phoneError, setPhoneError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //   const validatePhone = async (phoneNumber: number) => {
  //     if (phoneNumber.toString().length < 9) {
  //       setPhoneError('Masukkan nomor handphone yang benar');
  //       return;
  //     }
  //     if (phoneNumber.toString().length > 9) {
  //       setPhoneError('');
  //     }

  //     setIsLoading(true);
  //     try {
  //       const response = await baseUrl.post(
  //         `/auth/check-phone`,
  //         { nomor_telepon: phoneNumber },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       if (setPhoneRequired) {
  //         setPhoneRequired(true);
  //       }
  //     } catch (error: any) {
  //       setPhoneError(error.response.data.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handlePhoneBlur = () => {
    if (phoneNumber === undefined) {
      setPhoneError('Mohon isi nomor handphone anda');
    } else {
      //   validatePhone(phoneNumber);
      console.log('success');
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="relative rounded-md shadow-sm">
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          inputMode="numeric"
          //   pattern="\+62[0-9]{9,12}"
          className={`w-full px-2 py-2 border rounded-md transition-all duration-300 outline-none hover:border-blue-500  focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
          // autoComplete="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          onBlur={handlePhoneBlur}
          placeholder="81234567890"
        />
        {isLoading && (
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-gray-400 border-t-0 border-r-0 rounded-full animate-spin" />
          </div>
        )}
      </div>
      {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
    </div>
  );
};

type PhoneInputRegistration = {
  phoneNumber: string | undefined;
  setPhoneNumber: React.Dispatch<React.SetStateAction<any>>;
  countryCode: string | undefined;
  setCountryCode: React.Dispatch<React.SetStateAction<any>>;
  setPhoneRequired?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PhoneInputRegistration = ({
  phoneNumber,
  setPhoneNumber,
  countryCode,
  setCountryCode,
  setPhoneRequired,
}: PhoneInputRegistration) => {
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const { value } = e.target;
    let { value } = e.target;
    value = value.replace(/\D/g, ''); // hanya mengizinkan angka
    value = value.replace(/^0+/, ''); // menghapus leading zeros
    let processedPhoneNumber = value;
    // Check if the first character is 0
    if (value.charAt(0) === '0') {
      // Remove the first character if it is 0
      processedPhoneNumber = value.slice(1);
    }
    if (e.target.value === undefined) {
      setPhoneNumber(undefined);
      if (setPhoneRequired) {
        setPhoneRequired(false);
      }
    } else {
      setPhoneNumber(Number(processedPhoneNumber));
      if (setPhoneRequired) {
        setPhoneRequired(true);
      }
      setPhoneError('');
    }
  };
  const [phoneError, setPhoneError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phoneCodeData, setPhoneCodeData] = useState<PhoneCodeDTO[]>([]);
  // const [countryCode, setCountryCode] = useState<string | undefined>('');

  //   const validatePhone = async (phoneNumber: number) => {
  //     if (phoneNumber.toString().length < 9) {
  //       setPhoneError('Masukkan nomor handphone yang benar');
  //       return;
  //     }
  //     if (phoneNumber.toString().length > 9) {
  //       setPhoneError('');
  //     }

  //     setIsLoading(true);
  //     try {
  //       const response = await baseUrl.post(
  //         `/auth/check-phone`,
  //         { nomor_telepon: phoneNumber },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //       if (setPhoneRequired) {
  //         setPhoneRequired(true);
  //       }
  //     } catch (error: any) {
  //       setPhoneError(error.response.data.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handlePhoneBlur = () => {
    if (phoneNumber === undefined) {
      setPhoneError('Mohon isi nomor handphone anda');
    } else {
      //   validatePhone(phoneNumber);
      console.log('success');
    }
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

  const DropdownIndicator = () => null;

  return (
    <div className="flex flex-col w-full">
      <div className="relative rounded-md shadow-sm">
        <label
          htmlFor="phoneNumber"
          className="text-[16px] text-[#014A40] font-medium"
        >
          Phone Number
        </label>
        <div className="flex gap-1 items-center">
          <Select
            styles={{
              placeholder: (baseStyles) => ({
                ...baseStyles,
                color: 'rgb(156 163 175)', // Ubah warna placeholder sesuai kebutuhan Anda
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: '60px',
                background: '#b8e6d2',
                outline: 'none',
                height: '42px',
                border: 'none',
                boxShadow: 'none',
                borderRadius: '6px 0px 0px 6px',
                // padding: '12px',
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                width: '270px', // Ubah lebar dropdown sesuai kebutuhan Anda
              }),
            }}
            options={phoneCodeData}
            getOptionLabel={(option) => `${option.dial_code} ${option.name}`}
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
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            inputMode="numeric"
            //   pattern="\+62[0-9]{9,12}"
            className={`bg-[#b8e6d2] rounded-r-[6px] outline-none w-full h-[42px] p-3 placeholder:text-gray-400`}
            // autoComplete="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            onBlur={handlePhoneBlur}
            placeholder="81234567890"
          />
        </div>

        {isLoading && (
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-gray-400 border-t-0 border-r-0 rounded-full animate-spin" />
          </div>
        )}
      </div>
      {phoneError && <span className="text-red-500 text-sm">{phoneError}</span>}
    </div>
  );
};
