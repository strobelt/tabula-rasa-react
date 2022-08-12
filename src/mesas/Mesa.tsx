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
import { MesaProps } from './MesaProps';

export class Mesa extends Component<MesaProps> {
  render() {
    const mesa = this.props;
    return (
      <Card>
        <CardContent>
          <Typography variant='h5' component='span'>
            {mesa.nome}
          </Typography>
          <List>
            {mesa.participantes?.map((nome) => (
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
