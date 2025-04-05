import React from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';

const Login = ({ setUser }) => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Вхід</h2>
      <button onClick={handleLogin}>Увійти через Google</button>
    </div>
  );
};

export default Login;
