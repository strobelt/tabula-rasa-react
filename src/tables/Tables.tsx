import React from 'react';
import { TableCard } from './TableCard';
import { Card, Stack, Skeleton, Box, Typography } from '@mui/material';
import { TableDb } from './TableDb';
import { Table } from './Table';
import { NewTableForm } from './NewTableForm';

export class Tables extends React.Component<
  {},
  {
    tables: Table[];
    loaded: boolean;
  }
> {
  tableDb: TableDb;

  constructor(props: any) {
    super(props);
    this.state = {
      tables: [],
      loaded: false,
    };
    this.tableDb = new TableDb();
  }

  async componentDidMount() {
    await this.loadTables();
  }

  loadTables = async () => {
    this.setState({ loaded: false });
    const tables = await this.tableDb.getTables();
    this.setState({ tables, loaded: true });
  };

  render() {
    return (
      <Box>
        <Typography variant='h4' component='h1' gutterBottom>
          Mesas Disponíveis
        </Typography>
        <Stack spacing={2}>
          {this.state.loaded
            ? this.state.tables.map((mesa) => (
                <TableCard
                  {...mesa}
                  afterJoin={() => this.loadTables()}
                  key={mesa.id}
                />
              ))
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
        <NewTableForm onCreate={() => this.loadTables()} />
      </Box>
    );
  }
}
