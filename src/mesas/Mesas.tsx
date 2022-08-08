import React from 'react';
import { Mesa, MesaProps } from './Mesa';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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

export class Mesas extends React.Component<{}, { mesas: MesaProps[] }> {
  constructor(props: any) {
    super(props);
    this.state = { mesas: [] };
  }

  async componentDidMount() {
    const mesasCollection = collection(db, 'mesas');
    const mesasDocs = await getDocs(mesasCollection);
    const mesas = mesasDocs.docs.map(function x(doc) {
      return {
        id: doc.id,
        nome: doc.get('nome'),
        participantes: doc.get('participantes'),
      } as MesaProps;
    });

    this.setState({ mesas });
  }

  render() {
    return (
      <div>
        Oi das {this.state.mesas.length} mesas
        {this.state.mesas.map((mesa) => (
          <Mesa {...mesa} />
        ))}
      </div>
    );
  }
}
