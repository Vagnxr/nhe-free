/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import Pannel from 'components/Pannel';

import {
  updatePesquisaDisconnect,
  pesquisarSeguroRequest,
} from 'modules/pesquisar/disconnect/actions';

// import ItensPDV from './itensPDV.tsx';
import useStyles from './styles';
import DatePicker from 'components/DatePicker';

const SearchPannel = ({ expanded, handleChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const updateField = field => value => dispatch(updatePesquisaDisconnect({ field, value }));
  const {
    pesquisarDisconnect: { loginUsuario, dataInicial, dataFinal, loginsUsuarios },
  } = useSelector(store => store);
  const disableDate = loginUsuario.length > 0;
  const disableLogin = dataInicial || dataFinal;
  const updateLoginUsuario = e => updateField('loginUsuario')(e.target.value);
  const updateDatainicial = value => updateField('dataInicial')(value);
  const updateDataFinal = value => updateField('dataFinal')(value);
  const dataMaxima = new Date(
    Math.min(
      new Date(),
      new Date(
        dataInicial ? new Date(dataInicial).getFullYear() : new Date().getFullYear(),
        dataInicial ? new Date(dataInicial).getMonth() + 12 : new Date().getMonth() + 12,
        0,
      ),
    ),
  );

  return (
    <Pannel title="Pesquisar" expanded={expanded} handleChange={handleChange} direction="column">
      <Grid container direction="column" alignItems="center" spacing={4} xs={12}>
        <Grid
          item
          container
          spacing={2}
          direction="row"
          justify="space-between"
          alignItems="flex-end"
          xs={12}
        >
          <Grid item container xs={3} alignItems="flex-end">
            <Grid item xs={12}>
              <TextField
                label="LOGIN DE USUÁRIO"
                type="text"
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                onChange={updateLoginUsuario}
                value={loginUsuario}
                disabled={disableLogin}
              />
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={1}>
            <Grid item>
              <hr className={classes.divider} />
            </Grid>
          </Grid>
          <Grid item container xs={5} justify="space-between" alignItems="flex-end">
            <Grid item xs={12}>
              <Typography>DESCONEXÕES ENTRE:</Typography>
            </Grid>
            <Grid item xs={5}>
              <DatePicker
                name="dataInicial"
                label="DATA INICIAL"
                value={dataInicial}
                maxDate={new Date()}
                onChange={value => updateDatainicial(value)}
                disabled={disableDate}
              />
            </Grid>
            <Grid item xs={5}>
              <DatePicker
                name="dataFinal"
                label="DATA FINAL"
                value={dataFinal}
                maxDate={dataMaxima}
                minDate={dataInicial}
                onChange={value => updateDataFinal(value)}
                disabled={disableDate}
              />
            </Grid>
          </Grid>
          <Grid item container xs={3} alignItems="flex-end" justify="flex-end">
            <Grid item className={classes.buttonContainer}>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => dispatch(pesquisarSeguroRequest())}
              >
                PESQUISAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="row" justify="center" xs={12}>
          {loginsUsuarios.length > 0 && (
            <Grid item>
              <Typography>{loginsUsuarios.length} RESULTADOS</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item container direction="column" spacing={2} justify="center" xs={12}>
          {/* <ItensPDV /> */}
        </Grid>
      </Grid>
    </Pannel>
  );
};

SearchPannel.propTypes = {
  expanded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SearchPannel;
