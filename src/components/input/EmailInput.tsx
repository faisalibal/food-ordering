import React, { useState } from 'react';

type emailInput = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setEmailRequired?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EmailInput = ({
  email,
  setEmail,
  setEmailRequired,
}: emailInput) => {
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value.toLowerCase());
    if (setEmailRequired) {
      if (email.length > 0) {
        setEmailRequired(true);
      } else {
        setEmailRequired(false);
      }
    }
  };
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  //   const validateEmail = async (email: string) => {
  //     if (!emailRegex.test(email)) {
  //       setEmailError('Gunakan alamat email yang valid');
  //       return;
  //     }
  //     if (emailRegex.test(email)) {
  //       setEmailError('');
  //     }
  //     setIsLoading(true);
  //     try {
  //       const response = await baseUrl.post(
  //         `/auth/check-email`,
  //         { email: email },
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         }
  //       );
  //     } catch (error: any) {
  //       setEmailError(error.response.data.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleEmailBlur = () => {
    if (email.length < 1) {
      setEmailError('Mohon isi email anda');
    } else {
      //   validateEmail(email);
      console.log('success');
    }
  };
  return (
    <div className="relative w-full">
      <label htmlFor="email" className="text-[16px] text-[#014A40] font-medium">
        Email
      </label>
      <div className="relative">
        <input
          type="email"
          inputMode="email"
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          className={`bg-[#b8e6d2] rounded-[6px] outline-none w-full h-[42px] p-3 placeholder:text-gray-400`}
          placeholder="Masukkan Email"
          value={email}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        {isLoading && (
          <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-gray-400 border-t-0 border-r-0 rounded-full animate-spin" />
          </div>
        )}
      </div>
      {emailError && <span className="text-red-500 text-sm">{emailError}</span>}
    </div>
  );
};
