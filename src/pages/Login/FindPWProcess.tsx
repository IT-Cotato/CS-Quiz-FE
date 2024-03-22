import React, { useState } from 'react';
import FindPW from '@pages/Login/FindPW';
import EmailAuth from '@pages/Login/EmailAuth';
import ResetPW from '@pages/Login/ResetPW';

const FindPWProcess = () => {
  const [step, setStep] = useState(0);
  const goToNextStep = () => setStep(step + 1);
  const [email, setEmail] = useState('');
  const [mismatchError, setMismatchError] = useState(false);
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordCheck, setIsPasswordCheck] = useState(false);

  const propsForFindPW = {
    goToNextStep,
    isEmail,
    setIsEmail,
    isPassword,
    isPasswordCheck,
    email,
    setEmail,
  };

  const propsForEmailAuth = {
    goToNextStep,
    email,
    setEmail,
  };

  const propsForResetPW = {
    mismatchError,
    setMismatchError,
    isPassword,
    setIsPassword,
    isPasswordCheck,
    setIsPasswordCheck,
    isEmail,
    setIsEmail,
  };

  return (
    <div>
      {step === 0 && <FindPW {...propsForFindPW} />}
      {step === 1 && <EmailAuth {...propsForEmailAuth} />}
      {step === 2 && <ResetPW {...propsForResetPW} />}
    </div>
  );
};

export default FindPWProcess;
