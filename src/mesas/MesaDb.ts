import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import { MesaProps } from './Mesa';

const firebaseConfig = {
  apiKey: 'AIzaSyDx_50iBLx2qQVnaMBzewv6cg_lesIOink',
  authDomain: 'tabula-rasa-app.firebaseapp.com',
  projectId: 'tabula-rasa-app',
  storageBucket: 'tabula-rasa-app.appspot.com',
  messagingSenderId: '696623499494',
  appId: '1:696623499494:web:88087c8d2c065caa7f5327',
  measurementId: 'G-5TK7EYR8JN',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export class MesaDb {
  async getMesas() {
    const mesasCollection = collection(db, 'mesas');
    const mesasDocs = await getDocs(mesasCollection);
    return mesasDocs.docs.map(function x(doc) {
      return {
        id: doc.id,
        nome: doc.get('nome'),
        participantes: doc.get('participantes'),
      } as MesaProps;
    });
  }
}
