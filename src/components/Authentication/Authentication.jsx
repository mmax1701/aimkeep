import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { app, googleAuthProvider } from '../../firebase';
import Home from '../Home/Home';
import { Box, Button, CircularProgress, Typography, Container } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import PageLayout from '../PageLayout/PageLayout'; // Стилизация для страницы авторизации

const Authentication = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(maybeUser => {
      setUser(maybeUser);
      setLoading(false); // Загрузка завершена
    });
    return () => unsub();
  }, [auth]);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
    } catch (error) {
      console.error('Ошибка входа:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  if (loading) {
    return (
      <PageLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </PageLayout>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      {user ? (
        <Home user={user} handleSignOut={handleSignOut} /> // Отображение компонента Home
      ) : (
        <PageLayout>
          <Container>
            <Box sx={{ textAlign: 'center', padding: 3 }}>
              <Typography variant="h4" gutterBottom>
                Вітаємо у додатку AimKeep
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                У ньому ти можеш запланувати свої цілі на рік.
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Увійди за допомогою свого акаунту Google, щоб почати!
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSignIn}
                  startIcon={<GoogleIcon />}
                  sx={{
                    textTransform: 'none',
                    fontWeight: 'bold',
                    padding: '12px 24px',
                    fontSize: '1rem',
                  }}
                >
                  Увійти через Google
                </Button>
              </Box>
            </Box>
          </Container>
        </PageLayout>
      )}
    </Box>
  );
};

export default Authentication;
