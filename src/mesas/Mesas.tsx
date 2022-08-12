import React from 'react';
import { Mesa } from './Mesa';
import { Card, Stack, Skeleton, Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { MesaDb } from './MesaDb';
import { MesaProps } from './MesaProps';

export class Mesas extends React.Component<
  {},
  { mesas: MesaProps[]; loaded: boolean }
> {
  mesaDb: MesaDb;

  constructor(props: any) {
    super(props);
    this.state = { mesas: [], loaded: false };
    this.mesaDb = new MesaDb();
  }

  async componentDidMount() {
    await this.carregaMesas();
  }

  carregaMesas = async () => {
    const mesas = await this.mesaDb.buscaMesas();
    this.setState({ mesas, loaded: true });
  };

  criaMesa = async () => {
    this.setState({ loaded: false });
    await this.mesaDb.criaMesa('teste');
    await this.carregaMesas();
  };

  render() {
    return (
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Mesas Disponíveis
        </Typography>
        <Stack spacing={2}>
          {this.state.loaded
            ? this.state.mesas.map((mesa) => <Mesa {...mesa} key={mesa.id} />)
            : Array.from({ length: 2 }).map((_) => (
                <Card>
                  <Skeleton
                    variant='rectangular'
                    animation='wave'
                    height={300}
                  />
                </Card>
              ))}
        </Stack>
        <Box
          sx={{
            paddingTop: '10px',
          }}
        >
          <Button
            variant='contained'
            onClick={this.criaMesa}
            startIcon={<Add />}
            sx={{
              width: '100%',
            }}
          >
            Criar Mesa
          </Button>
        </Box>
      </Box>
    );
  }
}
