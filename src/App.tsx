import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import './App.css';
import { LoginDialog } from './tables/LoginDialog';
import { Tables } from './tables/Tables';
import { UserMenu } from './tables/UserMenu';

export class App extends React.Component<
  {},
  {
    openLogin: boolean;
    userName: string;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      openLogin: false,
      userName: localStorage.getItem('userName') as string,
    };
  }

  closeLogin = () => {
    this.setState({ openLogin: false });
  };

  setLogin = (userName: string) => {
    localStorage.setItem('userName', userName);
    this.setState({ userName: userName });
  };

  logOut = () => {
    localStorage.removeItem('userName');
    this.setState({ userName: '' });
  };

  render() {
    return (
      <Box>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Tabula Rasa
            </Typography>
            {this.state.userName ? (
              <UserMenu
                userName={this.state.userName}
                onLogoutClick={this.logOut}
              />
            ) : (
              <Button
                color='inherit'
                onClick={() => this.setState({ openLogin: true })}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Container>
          <LoginDialog
            open={this.state.openLogin}
            onClose={this.closeLogin}
            onSetLogin={this.setLogin}
          />
          <Box sx={{ my: 4 }}>
            <Tables />
          </Box>
        </Container>
      </Box>
    );
  }
}
