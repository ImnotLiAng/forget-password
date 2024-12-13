import { Input, Button } from 'antd';
import DragButton from "./compontents/dragButton";
import { checkEmail, checkCode, ResendCode } from './api';

import './App.css'
import { useState } from 'react';

const DEFAULT_EMAIL_ERROR_TIP = 'The account does not exist. Please enter a valid email address.';
const IDENTITY_SUBTITLE = 'Please enter the email address of the account to retrieve your password';
const CODE_SENT_TIP = `We've sent a verification code to your email, and
remains valid for 15 minutes. Please do not share this
code with others.`;
const DEFAULT_CODE_ERROR_TIP = 'The verification code is incorrect. Please enter the correct one.';

const IdentityEmail = ({ done }: { done: () => void }) => {
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  return (
    <>
      <div className='identity-email'>
        <h2 className='title'>Identity verification</h2>
        {!isCodeSent
        ? <>
          <div className='subtitle'>{IDENTITY_SUBTITLE}</div>
          <Input
            value={email}
            onChange={(e) => setEmail(e?.target?.value || '')}
            status={error ? 'error' : ''}
            placeholder='Email address'
          />
          {error ? <div className='error-tip'>{error}</div> : null }
          <div className='drag-btn-wrap'>
            <DragButton verified={verified} setVerified={setVerified} />
          </div>
          <Button className='btn-continue' type="primary" onClick={() => {
            if (verified) {
              checkEmail(email).then(({ data }) => {
                if (data.code !== 200) return Promise.reject(data.message);
                setIsCodeSent(true);
                setError('');
              }).catch(err => {
                setError(err || DEFAULT_EMAIL_ERROR_TIP)
              })
            }
          }}>Continue</Button>
        </>
        : <>
          <div className='subtitle'>{CODE_SENT_TIP}</div>
          <div className='email-address'>
            <span className='label'>Email address:</span>
            {email}
          </div>
          <Input
            value={code}
            onChange={(e) => setCode(e?.target?.value || '')}
            status={error ? 'error' : ''}
            placeholder='Enter verification code'
          />
          {error ? <div className='error-tip'>{error}</div> : null }
          <div className='resent'>
            Didn't receive the email? <span className='btn-resent' onClick={() => ResendCode(email)}>Resend</span>
          </div>
          <Button className='btn-continue' type="primary" onClick={() => {
            if (code) {
              checkCode(code).then(({ data }) => {
                if (data.code !== 200) return Promise.reject(data.message);
                done();
              }).catch(err => {
                setError(err || DEFAULT_CODE_ERROR_TIP)
              })
            }
          }}>Continue</Button>
        </>
        }
        
      </div>
    </>
  )
}

const RetrievePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const getPasswordTypeLength = (password: string) => [
    /[a-z]/.test(password), // Lowercase letters
    /[A-Z]/.test(password), // Uppercase letters
    /[0-9]/.test(password), // Numbers
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password), // Symbols
  ].filter(Boolean).length;

  const hasTwoTypes =  getPasswordTypeLength(password) >= 2;

  const validatePassword = (value: string) => {
    const passwordTypeLength = getPasswordTypeLength(value)
    let strength = 0;
    if (value.length >= 6 && value.length <= 20) strength++;
    if (hasTwoTypes) strength++;
    if (passwordTypeLength >= 3) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Password successfully updated!");
  };

  return (
    <div className="retrieve-password">
      <h2 className='title'>Retrieve password</h2>
      <div className='subtitle'>Please enter a new password and remember it</div>
          <Input
            type="password"
            value={password}
            placeholder='Enter new password'
            onChange={handlePasswordChange}
          />
          <div className="password-strength">
            <span>Safety level:</span>
            <div className="strength-bar">
              <div className={`strength-level ${passwordStrength >= 1 ? "level-1" : ""}`}></div>
              <div className={`strength-level ${passwordStrength >= 2 ? "level-2" : ""}`}></div>
              <div className={`strength-level ${passwordStrength >= 3 ? "level-3" : ""}`}></div>
            </div>
          </div>
          <ul className="password-criteria">
            <li className={password.length >= 6 && password.length <= 20 ? "valid" : "invalid"}>
              6-20 characters
            </li>
            <li className={/^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(password) ? "valid" : "invalid"}>
              Can contain only letters, numbers and punctuation marks (except spaces)
            </li>
            <li
              className={
                hasTwoTypes
                  ? "valid"
                  : "invalid"
              }
            >
              Uppercase letters, lowercase letters, numbers and punctuation includes at least 2
            </li>
          </ul>
          <Input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder='Re-enter new password'
          />
        <Button className="btn-submit" onClick={handleSubmit} type='primary'>
          Submit
        </Button>
    </div>
  );
};

function App() {
  const [isVerified, setIsVerified] = useState(true);
  return (
    <>
    {isVerified
    ? <RetrievePassword />
    : <IdentityEmail done={() => setIsVerified(true)} />   
    }
      
    </>
  )
}

export default App
