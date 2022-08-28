import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  IconButton,
  Theme,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import React from 'react';
import './App.css';
import { LoginDialog } from './tables/LoginDialog';
import { Tables } from './tables/Tables';
import { UserMenu } from './tables/UserMenu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export class App extends React.Component<
  {},
  {
    openLogin: boolean;
    userName: string;
    theme: Theme;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      openLogin: false,
      userName: localStorage.getItem('userName') as string,
      theme: createTheme({
        palette: {
          mode: 'dark' || localStorage.getItem('themeMode'),
        },
      }),
    };
  }

  toggleColorMode = () => {
    this.setState({
      theme: createTheme({
        palette: {
          mode: this.state.theme.palette.mode === 'dark' ? 'light' : 'dark',
        },
      }),
    });
    localStorage.setItem('themeMode', this.state.theme.palette.mode);
  };

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
      <ThemeProvider theme={this.state.theme}>
        <CssBaseline />
        <Box>
          <AppBar position='sticky'>
            <Toolbar>
              <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                Tabula Rasa
              </Typography>
              <IconButton
                sx={{ ml: 1 }}
                onClick={this.toggleColorMode}
                color='inherit'
              >
                {this.state.theme.palette.mode === 'dark' ? (
                  <Brightness7Icon />
                ) : (
                  <Brightness4Icon />
                )}
              </IconButton>
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
              <Tables loggedInUser={this.state.userName} />
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
    );
  }
}
