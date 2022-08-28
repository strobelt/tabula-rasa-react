import { Button, Menu, MenuItem } from '@mui/material';
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
    this.setState({ anchorEl: event.currentTarget });
    this.setState({ open: true });
  };

  closeMenu = () => {
    this.setState({ anchorEl: null });
    this.setState({ open: false });
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
          Oi, {this.props.userName}
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
