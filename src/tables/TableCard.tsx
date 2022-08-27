import React, { Component } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Person } from '@mui/icons-material';
import { Table } from './Table';
import { TableDb } from './TableDb';

type TableProps = Table & {
  afterJoin: Function;
};

export class TableCard extends Component<TableProps> {
  tableDb: TableDb;

  constructor(props: TableProps) {
    super(props);
    this.tableDb = new TableDb();
  }
  joinTable = async (table: Table, playerName: string) => {
    await this.tableDb.joinTable(table.reference, playerName);
    await this.props.afterJoin();
  };

  render() {
    const table = this.props;
    return (
      <Card>
        <CardContent>
          <Typography variant='h5' component='span'>
            {table.name}
          </Typography>
          <List>
            {table.players?.map((nome) => (
              <ListItem key={nome}>
                <ListItemAvatar>
                  <Avatar>
                    <Person />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>{nome}</ListItemText>
              </ListItem>
            ))}
          </List>
          <Button
            size='small'
            variant='outlined'
            sx={{
              width: '100%',
            }}
            onClick={() => this.joinTable(table, 'Test Player')}
          >
            Participar
          </Button>
        </CardContent>
      </Card>
    );
  }
}
