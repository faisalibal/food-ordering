import { useState, ChangeEvent, FocusEvent } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const PasswordRegex: RegExp =
  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+}{":;'?/>.<,])(?!.*\s).{8,}$/;

type PasswordInput = {
  password: string;
  verify: boolean;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  labelPassword: string;
  labelVerifikasiPassword?: string;
  setPasswordMatch?: React.Dispatch<React.SetStateAction<boolean>>;
};
export const PasswordInput = ({
  password,
  setPassword,
  verify,
  labelPassword,
  labelVerifikasiPassword,
  setPasswordMatch,
}: PasswordInput) => {
  const [passwordVerify, setPasswordVerify] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordVerifyError, setPasswordVerifyError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const handlePasswordVerifyChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setPasswordVerify(event.target.value);
    setPasswordVerifyError('');
    if (event.target.value === password) {
      if (setPasswordMatch) {
        setPasswordMatch(true);
      }
    }
    if (event.target.value !== password) {
      if (setPasswordMatch) {
        setPasswordMatch(true);
      }
    }
  };

  const handlePasswordBlur = (): void => {
    if (!password) {
      setPasswordError('Password is required');
    } else if (!PasswordRegex.test(password)) {
      setPasswordError(
        'Kata sandi harus mengandung setidaknya 8 karakter, termasuk 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 symbol.'
      );
    }
  };

  const handlePasswordVerifyBlur = (): void => {
    if (!passwordVerify) {
      setPasswordVerifyError('Verify password is required');
    } else if (password !== passwordVerify) {
      setPasswordVerifyError('Passwords do not match');
    }
  };

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleShowPasswordVerifyClick = () => {
    setShowPasswordVerify(!showPasswordVerify);
  };

  return (
    <div className="flex flex-col space-y-2 w-full">
      <div className="relative w-full">
        <label
          htmlFor="password"
          className="text-[16px] text-[#014A40] font-medium"
        >
          {labelPassword}
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            className={`bg-[#b8e6d2] rounded-[6px] outline-none w-full h-[42px] p-3 placeholder:text-gray-400`}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          <div
            className="absolute top-[10px] right-0 pr-3 cursor-pointer"
            onClick={handleShowPasswordClick}
          >
            {showPassword ? (
              <FiEyeOff className="text-[18px]" />
            ) : (
              <FiEye className="text-[18px]" />
            )}
          </div>
        </div>
        {passwordError && (
          <span className="text-red-500 text-sm">{passwordError}</span>
        )}
      </div>
      {verify && (
        <div className="relative w-full">
          <label htmlFor="passwordVerify">{labelVerifikasiPassword}</label>
          <div className="relative">
            <input
              type={showPasswordVerify ? 'text' : 'password'}
              className={`w-full px-3 py-2 border rounded-md transition-all duration-300 outline-none hover:border-primary-500  focus:border-primary-500 focus:ring-2 focus:ring-primary-100 ${
                passwordVerifyError ? 'border-red-500' : ''
              }`}
              placeholder="Verify Password"
              value={passwordVerify}
              onChange={handlePasswordVerifyChange}
              onBlur={handlePasswordVerifyBlur}
            />
            <div
              className="absolute top-[10px] right-0 pr-3 cursor-pointer"
              onClick={handleShowPasswordVerifyClick}
            >
              {showPasswordVerify ? (
                <FiEyeOff className="text-[18px]" />
              ) : (
                <FiEye className="text-[18px]" />
              )}
            </div>
          </div>
          {passwordVerifyError && (
            <span className="text-red-500 text-sm">{passwordVerifyError}</span>
          )}
        </div>
      )}
    </div>
  );
};
