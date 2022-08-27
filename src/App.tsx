import React from 'react';
import { Box, Container } from '@mui/material';
import './App.css';
import { Tables } from './tables/Tables';

export class App extends React.Component {
  render() {
    return (
      <Container maxWidth='sm'>
        <Box sx={{ my: 4 }}>
          <Tables />
        </Box>
      </Container>
    );
  }
}
