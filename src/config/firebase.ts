import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB1cCdlIAKHLuBq4mZd9sTbqXR67Thp_mU",
  authDomain: "dashboard-d2b60.firebaseapp.com",
  databaseURL: "https://dashboard-d2b60-default-rtdb.firebaseio.com",
  projectId: "dashboard-d2b60",
  storageBucket: "dashboard-d2b60.firebasestorage.app",
  messagingSenderId: "118050738245",
  appId: "1:118050738245:web:7d6d67cb44db957dd9d32c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
