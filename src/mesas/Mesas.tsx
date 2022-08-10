import React from 'react';
import { Mesa, MesaProps } from './Mesa';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { Card, Stack, Skeleton, Typography } from '@mui/material';
import { Box } from '@mui/system';

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

export class Mesas extends React.Component<
  {},
  { mesas: MesaProps[]; loaded: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { mesas: [], loaded: false };
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

    this.setState({ mesas, loaded: true });
  }

  render() {
    return this.state.loaded ? (
      <Box>
        <Typography variant='h6' gutterBottom>
          Existem {this.state.mesas.length} mesas disponíveis
        </Typography>
        <Stack spacing={2}>
          {this.state.mesas.map((mesa) => (
            <Mesa {...mesa} key={mesa.id} />
          ))}
        </Stack>
      </Box>
    ) : (
      <Box>
        <Stack spacing={2}>
          {Array.from({ length: 2 }).map((_) => (
            <Card>
              <Skeleton variant='rectangular' animation='wave' height={300} />
            </Card>
          ))}
        </Stack>
      </Box>
    );
  }
}
