/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-shadow */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { updatePesquisa, pesquisarRequest } from 'modules/pesquisar/actions';

import RadioGroup from 'components/radioGroup/index';
import Pannel from 'components/Pannel';

import ItensPDV from './itensPDV.tsx';
import useStyles from './styles';

const SearchPannel = ({ expanded, handleChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const updateField = field => value => dispatch(updatePesquisa({ field, value }));
  const {
    canais: { canaisDisponiveis },
    pesquisar: { canal, pdv, analiseDocumento, impedidoBuscaCanal, pdvs },
  } = useSelector(store => store);
  const listCanaisDisponiveis = [{ label: 'Selecione', value: 'SELECIONE' }].concat(
    canaisDisponiveis.map(({ canal: canalLabel, canalId }) => ({
      label: canalLabel,
      value: canalId,
    })),
  );
  const updatePDV = e => updateField('pdv')(e.target.value);
  const updateCanal = e => updateField('canal')(e.target.value);
  const updateAnaliseDocumento = updateField('analiseDocumento');
  const updateImpedimentoBuscaCanal = () => updateField('impedidoBuscaCanal')(pdv.length > 0);
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
                label="CÓDIGO DO PONTO DE VENDA"
                type="text"
                className={classes.textField}
                InputLabelProps={{ shrink: true }}
                onChange={updatePDV}
                onBlur={updateImpedimentoBuscaCanal}
                value={pdv}
                disabled={canal !== 'SELECIONE'}
              />
            </Grid>
          </Grid>
          <Grid item container justify="center" xs={1}>
            <Grid item>
              <hr className={classes.divider} />
            </Grid>
          </Grid>
          <Grid item container xs={8} justify="space-between" alignItems="flex-end">
            <Grid item xs={4}>
              <TextField
                name="canal"
                select
                label="CANAL"
                disabled={impedidoBuscaCanal}
                className={classes.textField}
                onChange={updateCanal}
                value={canal}
              >
                {listCanaisDisponiveis.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={5} className={classes.radioContainer}>
              <RadioGroup
                name="analiseDocumento"
                title="ANÁLISE DE DOCUMENTO"
                onChange={updateAnaliseDocumento}
                options={[
                  { label: 'LIGADO', value: 'LIGADO' },
                  { label: 'DESLIGADO', value: 'DESLIGADO' },
                ]}
                disabled={impedidoBuscaCanal}
                active={analiseDocumento}
              />
            </Grid>
            <Grid item className={classes.buttonContainer}>
              <Button
                className={classes.button}
                variant="outlined"
                onClick={() => dispatch(pesquisarRequest())}
              >
                PESQUISAR
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container direction="row" justify="center" xs={12}>
          {pdvs.length > 0 && (
            <Grid item>
              <Typography>{pdvs.length} RESULTADOS</Typography>
            </Grid>
          )}
        </Grid>
        <Grid item container direction="column" spacing={2} justify="center" xs={12}>
          <ItensPDV />
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
