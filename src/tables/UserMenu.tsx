import { Person } from '@mui/icons-material';
import { Avatar, Button, Menu, MenuItem, Typography } from '@mui/material';
import React from 'react';

export class UserMenu extends React.Component<
  {
    userName: string;
    onLogoutClick: Function;
  },
  {
    open: boolean;
    anchorEl: HTMLElement | null;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.setState({ anchorEl: event.currentTarget, open: true });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null, open: false });
  };

  logOut = () => {
    this.closeMenu();
    this.props.onLogoutClick();
  };

  render() {
    return (
      <div>
        <Button
          id='basic-button'
          color='inherit'
          aria-controls={this.state.open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={this.state.open ? 'true' : undefined}
          onClick={this.openMenu}
        >
          <Avatar
            variant='rounded'
            sx={{
              width: 24,
              height: 24,
            }}
          >
            <Person fontSize='small' />
          </Avatar>
          <Typography
            sx={{
              pl: 1,
            }}
          >
            {this.props.userName}
          </Typography>
        </Button>
        <Menu
          id='logged-menu'
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.closeMenu}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={this.logOut}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}
