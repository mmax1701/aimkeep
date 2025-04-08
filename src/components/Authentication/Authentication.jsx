import React, { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { app, googleAuthProvider } from '../../firebase';
import Home from '../Home/Home';

const Authentication = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ← добавили состояние загрузки

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(maybeUser => {
      setUser(maybeUser);
      setLoading(false); // ← загрузка завершена
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
    return <p>Загрузка...</p>; // ← пока загружается — показываем "Загрузка"
  }

  return (
    <div>
      {user ? (
        <div>
          <Home user={user.displayName} handleSignOut={handleSignOut} />
          {/* <p>Привет, {user.displayName}!</p> */}
          {/* <button onClick={handleSignOut}>Выйти</button> */}
        </div>
      ) : (
        <div>
          <p>Вітаємо у додатку AimKeep</p>
          <p>У ньому ти можеш запланувати свої цілі на рік</p>
          <p>Щоб додати ціль, увійди за допомогою свого акаунту Google</p>
          <button onClick={handleSignIn}>Увійти</button>
        </div>
      )}
    </div>
  );
};

export default Authentication;
