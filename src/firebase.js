import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBfToCuxgwAdUorTDis2RfXPky60YE86l0',
  authDomain: 'aimkeep.firebaseapp.com',
  projectId: 'aimkeep',
  storageBucket: 'aimkeep.firebasestorage.app',
  messagingSenderId: '353743209790',
  appId: '1:353743209790:web:b28dd24eb8b2c6a1c6586f',
  measurementId: 'G-D2JEM72NLQ',
};

export const app = initializeApp(firebaseConfig);
export const googleAuthProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);
export const db = getFirestore(app);
