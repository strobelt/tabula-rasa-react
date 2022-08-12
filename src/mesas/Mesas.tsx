import React from 'react';
import { Mesa, MesaProps } from './Mesa';
import { Card, Stack, Skeleton } from '@mui/material';
import { MesaDb } from './MesaDb';

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
    const mesas = await this.mesaDb.getMesas();
    this.setState({ mesas, loaded: true });
  }

  render() {
    return (
      <Stack spacing={2}>
        {this.state.loaded
          ? this.state.mesas.map((mesa) => <Mesa {...mesa} key={mesa.id} />)
          : Array.from({ length: 2 }).map((_) => (
              <Card>
                <Skeleton variant='rectangular' animation='wave' height={300} />
              </Card>
            ))}
      </Stack>
    );
  }
}
