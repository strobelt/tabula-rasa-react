import React from 'react';
import { Box, Container } from '@mui/material';
import './App.css';
import { Mesas } from './tables/Tables';

export class App extends React.Component {
  render() {
    return (
      <Container maxWidth='sm'>
        <Box sx={{ my: 4 }}>
          <Mesas />
        </Box>
      </Container>
    );
  }
}
