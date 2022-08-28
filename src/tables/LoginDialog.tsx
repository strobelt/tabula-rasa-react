import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import React from 'react';

export class LoginDialog extends React.Component<
  {
    open: boolean;
    onClose: any;
    onSetLogin: Function;
  },
  {
    userName: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = { userName: '' };
  }

  updateUserName = (event: any) => {
    this.setState({ userName: event?.target?.value });
  };

  setLogin = (event: any) => {
    event.preventDefault();
    this.props.onSetLogin(this.state.userName);
    this.setState({ userName: '' });
    this.props.onClose();
  };

  render() {
    return (
      <Dialog open={this.props.open} onClose={this.props.onClose}>
        <DialogTitle>Qual seu nome?</DialogTitle>
        <form autoComplete='off' onSubmit={(event) => this.setLogin(event)}>
          <DialogContent>
            <DialogContentText>
              Entre com seu nome para poder criar mesas e participar delas.
            </DialogContentText>
            <TextField
              margin='dense'
              id='userName'
              name='userName'
              label='Nome'
              type='text'
              fullWidth
              autoFocus
              variant='standard'
              value={this.state.userName}
              onChange={this.updateUserName}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onClose}>Cancelar</Button>
            <Button type='submit'>Entrar</Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
