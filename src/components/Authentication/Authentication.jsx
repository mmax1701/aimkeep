import React, { useEffect, useState } from "react";
import { getAuth, signInWithPopup, signOut } from "firebase/auth";
import { app, googleAuthProvider } from "../../firebase";
import Home from "../Home/Home";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import PageLayout from "../PageLayout/PageLayout";

const Authentication = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inAppBrowser, setInAppBrowser] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((maybeUser) => {
      setUser(maybeUser);
      setLoading(false);
    });

    if (isInAppBrowser()) {
      setInAppBrowser(true);
    }

    return () => unsub();
  }, [auth]);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleAuthProvider);
      setUser(result.user);
    } catch (error) {
      console.error("Ошибка входа:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  const handleOpenInBrowser = () => {
    window.open(window.location.href, "_blank");
  };

  if (loading) {
    return (
      <PageLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      </PageLayout>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {user ? (
        <Home user={user} handleSignOut={handleSignOut} />
      ) : (
        <PageLayout>
          <Container maxWidth="sm">
            {/* 🚫 Предупреждение о WebView */}
            {inAppBrowser && (
              <Box
                sx={{
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffeeba",
                  borderRadius: 2,
                  p: 2,
                  mb: 3,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="text.primary"
                  fontWeight="bold"
                  gutterBottom
                >
                  ⚠️ Здається, ви відкрили сайт у вбудованому браузері
                  (Instagram, LinkedIn тощо).
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Вхід через Google може не працювати. Будь ласка, відкрийте
                  сайт у звичайному браузері.
                </Typography>
              </Box>
            )}

            {/* 👋 Приветствие и кнопка входа */}
            <Box sx={{ textAlign: "center", py: 4 }}>
              <Typography variant="h4" gutterBottom>
                Вітаємо у додатку AimKeep
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                У ньому ти можеш запланувати свої цілі на рік.
              </Typography>
              <Typography variant="body1" color="text.secondary" mb={3}>
                Увійди за допомогою свого акаунту Google, щоб почати!
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignIn}
                startIcon={<GoogleIcon />}
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  padding: "12px 24px",
                  fontSize: "1rem",
                }}
              >
                Увійти через Google
              </Button>
            </Box>
          </Container>
        </PageLayout>
      )}
    </Box>
  );
};

// 🔍 Функция для определения WebView
function isInAppBrowser() {
  const ua = navigator.userAgent || navigator.vendor || window.opera;
  return /FBAN|FBAV|Instagram|LinkedIn|Twitter|Snapchat|Line/i.test(ua);
}

export default Authentication;
