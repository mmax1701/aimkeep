import React from 'react';
import { auth, googleAuthProvider } from '../../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Box, Button, Typography } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Вхід
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={3}>
        Увійдіть за допомогою вашого облікового запису Google
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        startIcon={<GoogleIcon />}
        sx={{
          padding: '10px 20px',
          fontSize: '1rem',
          fontWeight: 'bold',
          textTransform: 'none',
          '@media (max-width: 600px)': {
            padding: '8px 18px',
            fontSize: '0.9rem',
          },
        }}
      >
        Увійт через Google
      </Button>
    </Box>
  );
};

export default Login;
