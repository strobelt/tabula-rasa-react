import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore/lite';
import { MesaProps } from './MesaProps';

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
  mesasCollection = collection(db, 'mesas');

  async buscaMesas() {
    const mesasDocs = await getDocs(this.mesasCollection);
    return mesasDocs.docs.map(function x(doc) {
      return {
        id: doc.id,
        nome: doc.get('nome'),
        participantes: doc.get('participantes'),
      } as MesaProps;
    });
  }

  async criaMesa(nome: string) {
    return addDoc(this.mesasCollection, {
      nome,
    } as MesaProps);
  }
}
