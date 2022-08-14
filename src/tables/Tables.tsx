import React from 'react';
import { Mesa } from './Table';
import {
  Card,
  Stack,
  Skeleton,
  Box,
  Typography,
  Button,
  TextField,
  CardContent,
  Snackbar,
  Alert,
  AlertColor,
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { TableDb } from './TableDb';
import { TableProps } from './TableProps';

export class Mesas extends React.Component<
  {},
  {
    tables: TableProps[];
    loaded: boolean;
    tableName: string;
    hasError: boolean;
    errorMessage: string;
    creationStatus: AlertColor;
    creationMessage: string;
  }
> {
  tableDb: TableDb;

  constructor(props: any) {
    super(props);
    this.state = {
      tables: [],
      loaded: false,
      tableName: '',
      hasError: false,
      errorMessage: '',
      creationStatus: 'success',
      creationMessage: '',
    };
    this.tableDb = new TableDb();
  }

  async componentDidMount() {
    await this.loadTables();
  }

  loadTables = async () => {
    const tables = await this.tableDb.getTables();
    this.setState({ tables, loaded: true });
  };

  createTable = async () => {
    this.setState({ loaded: false });
    await this.tableDb.createTable(this.state.tableName);
    this.showSuccessMessage();
    await this.loadTables();
  };

  handleChange = (event: any) => {
    const nomeMesa = event.target.value;
    this.setState({
      tableName: nomeMesa,
      hasError: nomeMesa.length <= 0,
      errorMessage:
        nomeMesa.length <= 0 ? 'Por favor, digite um nome para a mesa' : '',
    });
  };

  showErrorMessage = () => {
    this.setState({
      creationStatus: 'error',
      creationMessage: 'Falha ao criar mesa',
    });
  };

  showSuccessMessage = () => {
    this.setState({
      creationStatus: 'success',
      creationMessage: 'Mesa criada!',
    });
  };

  handleCloseModal = (_: any, reason?: string) => {
    if (reason === 'clickaway') return;
    this.setState({
      creationMessage: '',
      creationStatus: 'success',
    });
  };

  handleSubmit = (event: any) => {
    if (this.state.hasError) this.showErrorMessage();
    else this.showSuccessMessage();
    this.createTable();
    event.preventDefault();
  };

  render() {
    return (
      <Box>
        <Snackbar
          open={this.state.creationMessage.length > 0}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={this.handleCloseModal}
          autoHideDuration={6000}
        >
          <Alert
            severity={this.state.creationStatus}
            onClose={this.handleCloseModal}
          >
            {this.state.creationMessage}
          </Alert>
        </Snackbar>
        <Typography variant='h4' component='h1' gutterBottom>
          Mesas Disponíveis
        </Typography>
        <Stack spacing={2}>
          {this.state.loaded
            ? this.state.tables.map((mesa) => <Mesa {...mesa} key={mesa.id} />)
            : Array.from({ length: 2 }).map((_) => (
                <Card>
                  <Skeleton
                    variant='rectangular'
                    animation='wave'
                    height={300}
                  />
                </Card>
              ))}
        </Stack>
        <Card>
          <CardContent>
            <Typography variant='h5' component='span'>
              Criar Nova Mesa
            </Typography>
            <Box
              component='form'
              sx={{
                paddingTop: '10px',
                '& .MuiTextField-root': { my: 1, width: '100%' },
              }}
              noValidate
              autoComplete='off'
              onSubmit={this.handleSubmit}
            >
              <div>
                <TextField
                  required
                  id='nome'
                  error={this.state.hasError}
                  helperText={this.state.errorMessage}
                  label='Nome da Mesa'
                  value={this.state.tableName}
                  onChange={this.handleChange}
                />
              </div>
              <Button
                type='submit'
                variant='contained'
                startIcon={<Add />}
                sx={{
                  width: '100%',
                }}
              >
                Criar Mesa
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }
}
