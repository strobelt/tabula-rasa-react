import { initializeApp } from 'firebase/app';
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
} from 'firebase/firestore/lite';
import { TableProps } from './TableProps';

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

export class TableDb {
  tableCollection = collection(db, 'tables');

  async getTables() {
    const mesasDocs = await getDocs(this.tableCollection);
    return mesasDocs.docs
      .map(function x(doc) {
        return {
          id: doc.id,
          name: doc.get('name'),
          players: doc.get('players'),
        } as TableProps;
      })
      .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
  }

  async createTable(name: string) {
    return addDoc(this.tableCollection, {
      name: name,
    } as TableProps);
  }
}
