import { Add } from '@mui/icons-material';
import { Button, Typography, Box, Container } from '@mui/material';
import './App.css';
import { Mesas } from './mesas/Mesas';

function App() {
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Mesas Disponíveis
        </Typography>
        <Mesas />
        <Box sx={{
          paddingTop: '10px',
        }}>
          <Button variant='contained' startIcon={<Add />} sx={{
            width: '100%'
          }}>
            Criar Mesa
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default App;
