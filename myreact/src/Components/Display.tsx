import { GoogleLogin } from '@react-oauth/google';
import React from 'react';

export default function Display() {
  return (
    <GoogleLogin
      onSuccess={credentialResponse => {
        fetch('https://localhost:5001/api/auth/google-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: credentialResponse.credential })
        });
      }}
      onError={() => {
        console.log('Login Failed');
      }}
    />
  );
}
