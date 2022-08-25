import { Add } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
  AlertColor,
} from '@mui/material';
import React from 'react';
import { TableDb } from './TableDb';

export class NewTableForm extends React.Component<
  {
    onCreate: any;
  },
  {
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
      tableName: '',
      hasError: false,
      errorMessage: '',
      creationStatus: 'success',
      creationMessage: '',
    };
    this.tableDb = new TableDb();
  }

  clearForm = () => {
    this.setState({
      tableName: '',
      hasError: false,
      errorMessage: '',
      creationStatus: 'success',
      creationMessage: '',
    });
  };

  createTable = async () => {
    return await this.tableDb.createTable(this.state.tableName);
  };

  handleChange = (event: any) => {
    const nomeMesa = event?.target?.value;
    this.setState({
      tableName: nomeMesa,
      hasError: !nomeMesa || nomeMesa.length <= 0,
      errorMessage:
        !nomeMesa || nomeMesa.length <= 0
          ? 'Por favor, digite um nome para a mesa'
          : '',
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

  handleSubmit = async (event: any) => {
    this.handleChange(event);
    if (!this.state.hasError) {
      const result = await this.createTable();
      if (result) {
        this.showSuccessMessage();
        this.clearForm();
        this.props.onCreate();
        this.showSuccessMessage();
      } else {
        this.showErrorMessage();
      }
    }
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
