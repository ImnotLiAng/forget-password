import { Input, Button } from 'antd';
import DragButton from "./compontents/dragButton";
import { checkEmail } from './api';

import './App.css'
import { useState } from 'react';

const DEFAULT_ERROR_TIP = 'The account does not exist. Please enter a valid email address.';
const IDENTITY_SUBTITLE = 'Please enter the email address of the account to retrieve your password';
const CODE_SENT_TIP = `We've sent a verification code to your email, and
remains valid for 15 minutes. Please do not share this
code with others.`;

const IdentityEmail = () => {
  const [vertified, setVertified] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const subtitle = !isCodeSent ? IDENTITY_SUBTITLE : CODE_SENT_TIP;
  return (
    <>
      <div className='identity-email'>
        <h2 className='title'>Identity verification</h2>
        <div className='subtitle'>{subtitle}</div>
        <Input
          value={email}
          onChange={(e) => setEmail(e?.target?.value || '')}
          status={error ? 'error' : ''}
          placeholder='Email address'
        />
        {error ? <div className='error-tip'>{error}</div> : null }
        <div className='drag-btn-wrap'>
          <DragButton vertified={vertified} setVertified={setVertified} />
        </div>
        <Button className='btn-continue' type="primary" onClick={() => {
          if (vertified) {
            checkEmail(email).then(({ data }) => {
              if (data.code !== 200) return Promise.reject(data.message);
              setIsCodeSent(true);
            }).catch(err => {
              setError(err || DEFAULT_ERROR_TIP)
            })
          }
        }}>Continue</Button>
      </div>
    </>
  )
}

function App() {

  return (
    <>
      <IdentityEmail />   
    </>
  )
}

export default App
