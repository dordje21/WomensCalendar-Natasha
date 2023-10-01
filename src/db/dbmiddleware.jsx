import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyArEzCA-TSPs6-t2sVmMd-8hIdx1_LyinM",
  authDomain: "natasha-44487.firebaseapp.com",
  projectId: "natasha-44487",
  storageBucket: "natasha-44487.appspot.com",
  messagingSenderId: "162215656610",
  appId: "1:162215656610:web:af2f36379afbd793702bfb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
