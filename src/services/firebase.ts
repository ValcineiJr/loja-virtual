import { initializeApp } from 'firebase/app';

import { getStorage } from 'firebase/storage';

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: `AIzaSyCeWJbBZzH9OVBY0kjtxa6IFJicJjJ48VU`,
  authDomain: `salao-de-jogos.firebaseapp.com`,
  projectId: `salao-de-jogos`,
  storageBucket: `salao-de-jogos.appspot.com`,
  messagingSenderId: `76299450437`,
  appId: `1:76299450437:web:1b1f9209a4204d7b494b2c`,
};

const firebaseApp = initializeApp(firebaseConfig);

// const database = getFirestore(firebaseApp);
const auth = getAuth();
const database = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, database, storage };
