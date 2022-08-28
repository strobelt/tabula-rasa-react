import React, { Component } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { Person, RemoveCircle } from '@mui/icons-material';
import { Table } from './Table';
import { TableDb } from './TableDb';

type TableProps = Table & {
  loggedInUser: string;
  afterJoin: Function;
  afterLeave: Function;
};

export class TableCard extends Component<
  TableProps,
  {
    userName: string;
    open: boolean;
    tableBeingLeft: Table;
  }
> {
  tableDb: TableDb;

  constructor(props: TableProps) {
    super(props);
    this.tableDb = new TableDb();
    this.state = {
      userName: localStorage.getItem('userName') as string,
      open: false,
      tableBeingLeft: {} as Table,
    };
  }
  joinTable = async (table: Table) => {
    await this.tableDb.joinTable(table.reference, this.state.userName);
    await this.props.afterJoin();
  };

  confirmLeaveTable = (table: Table) => {
    this.setState({
      open: true,
      tableBeingLeft: table,
    });
  };

  resetLeaveTableState = () => {
    this.setState({
      open: false,
      tableBeingLeft: {} as Table,
    });
  };

  dontLeaveTable = () => {
    this.resetLeaveTableState();
  };

  leaveTable = async () => {
    await this.tableDb.leaveTable(
      this.state.tableBeingLeft.reference,
      this.state.userName
    );
    this.resetLeaveTableState();
    await this.props.afterLeave();
  };

  render() {
    const table = this.props;
    return (
      <Box>
        <Dialog
          open={this.state.open}
          onClose={this.dontLeaveTable}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle>
            Tem certeza que quer deixar a mesa {this.state.tableBeingLeft.name}?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.dontLeaveTable}>Não</Button>
            <Button onClick={this.leaveTable} autoFocus>
              Sim
            </Button>
          </DialogActions>
        </Dialog>
        <Card>
          <CardContent>
            <Typography variant='h5' component='span'>
              {table.name}
            </Typography>
            <List>
              {table.players?.sort().map((playerName) => (
                <ListItem key={playerName}>
                  <ListItemAvatar>
                    <Avatar variant='rounded'>
                      <Person />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{playerName}</ListItemText>
                  {this.props.loggedInUser &&
                    this.state.userName === playerName && (
                      <IconButton
                        color='error'
                        onClick={() => this.confirmLeaveTable(table)}
                      >
                        <RemoveCircle />
                      </IconButton>
                    )}
                </ListItem>
              ))}
            </List>
            {this.props.loggedInUser && (
              <Button
                size='small'
                variant='outlined'
                sx={{
                  width: '100%',
                }}
                onClick={() => this.joinTable(table)}
              >
                Participar
              </Button>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  }
}
