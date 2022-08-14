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
import { TableProps } from './TableProps';

export class Mesa extends Component<TableProps> {
  render() {
    const mesa = this.props;
    return (
      <Card>
        <CardContent>
          <Typography variant='h5' component='span'>
            {mesa.name}
          </Typography>
          <List>
            {mesa.players?.map((nome) => (
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
          >
            Participar
          </Button>
        </CardContent>
      </Card>
    );
  }
}
