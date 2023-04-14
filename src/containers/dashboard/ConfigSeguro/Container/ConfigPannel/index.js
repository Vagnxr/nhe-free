/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

import RadioGroup from 'components/radioGroup/index';
import Pannel from 'components/Pannel';

import {
  validateSeguroRequest,
  saveSeguroRequest,
  resetSeguroValid,
} from 'modules/config/seguro/actions';
import { canaisSeguroRequest } from 'modules/canais/seguro/actions';
import { curry } from 'utils/helpers';

import ConfigSchema from './ConfigSchema';

const useStyles = makeStyles({
  textField: {
    width: '70%',
  },
  textTitle: {
    color: '#009DE1',
    fontFamily: 'dinmedium',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '16px',
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    marginBottom: '2px',
    textTransform: 'uppercase',
  },
  subText: {
    color: '#6B6B6B',
    fontFamily: 'dinmedium',
    fontSize: '14px',
    fontWeight: 400,
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    textTransform: 'uppercase',
  },
  textArea: {
    width: '100%',
    height: '150px',
    resize: 'none',
    border: '1px solid #233573',
    textTransform: 'uppercase',
  },
  buttonContainer: {
    alignSelf: 'flex-end',
  },
  button: {
    background: `linear-gradient(to right, #233573 0%, #059BDF 100%)`,
    color: '#FFF',
    borderRadius: '20px',
    width: '120px',
    height: '30px',
    border: 0,
    margin: 0,
    fontFamily: 'dinmedium',
    fontSize: '16px',
  },
  disabled: {
    background: '#B9B9B9',
    color: '#FFF !important',
  },
  error: {
    color: '#F44336',
    marginTop: '8px',
  },
  radioContainer: {
    width: '250px',
  },
});

const isDisabled = formValues =>
  Object.keys(formValues).some(key => !formValues[key] || formValues[key] === 'SELECIONE');

const ConfigPannel = ({ expanded, handleChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const canais = useSelector(
    ({ canaisSeguro: { canaisSeguroDisponiveis } }) => canaisSeguroDisponiveis,
  );
  const { valid } = useSelector(({ configSeguro }) => configSeguro);
  useEffect(() => {
    dispatch(canaisSeguroRequest());
  }, [dispatch]);
  const canaisDisponiveis = [{ label: 'Selecione', value: 'SELECIONE' }].concat(
    canais.map(({ canal, canalId }) => ({ label: canal, value: canalId })),
  );
  return (
    <Formik
      onSubmit={() => {
        // This is intentional
      }}
      initialValues={{ canal: 'agente_autorizado', status: 'DESLIGADO', pontosDeVenda: '' }}
      validationSchema={ConfigSchema}
    >
      {props => {
        const {
          values,
          setFieldValue,
          handleChange: handleChangeForm,
          handleBlur,
          touched,
          errors,
          handleReset,
        } = props;
        if (valid) {
          handleReset();
          dispatch(resetSeguroValid());
        }
        const pontosDeVenda = values.pontosDeVenda.split('\n');
        const disabled = isDisabled(values);
        return (
          <Pannel title="Configurar" expanded={expanded} handleChange={handleChange}>
            <Grid container spacing={2}>
              <Grid direction="column" justify="flex-start" item container md={6}>
                <Grid item>
                  <TextField
                    name="canal"
                    select
                    label="CANAL"
                    error={!!(touched.canal && errors.canal)}
                    helperText={touched.canal && errors.canal}
                    value={values.canal}
                    className={classes.textField}
                    onChange={handleChangeForm}
                    onBlur={handleBlur}
                    margin="normal"
                  >
                    {canaisDisponiveis.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item className={classes.radioContainer}>
                  <RadioGroup
                    name="status"
                    title="VENDA DE SEGURO"
                    onChange={curry(setFieldValue)('status')}
                    options={[
                      { label: 'LIGADO', value: 'LIGADO' },
                      { label: 'DESLIGADO', value: 'DESLIGADO' },
                    ]}
                    active={values.status}
                  />
                </Grid>
              </Grid>
              <Grid direction="column" justify="space-between" item container md={6}>
                <Grid item>
                  <Typography className={classes.textTitle}>Código do Ponto de Venda</Typography>
                  <Typography className={classes.subText}>
                    Insira os códigos dos pontos de venda, separando-os com quebra de linha.
                  </Typography>
                  <textarea
                    name="pontosDeVenda"
                    onBlur={handleBlur}
                    className={classes.textArea}
                    value={values.pontosDeVenda}
                    onChange={handleChangeForm}
                  />
                  {touched.pontosDeVenda && errors.pontosDeVenda && (
                    <Typography className={classes.error}>{errors.pontosDeVenda}</Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container justify="flex-end" item xs={12}>
                <Grid item className={classes.buttonContainer}>
                  <Button
                    className={clsx(classes.button, { [classes.disabled]: disabled })}
                    variant="outlined"
                    disabled={disabled}
                    onClick={() =>
                      pontosDeVenda.length === 1
                        ? dispatch(validateSeguroRequest({ values }))
                        : dispatch(saveSeguroRequest({ values }))
                    }
                  >
                    SALVAR
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Pannel>
        );
      }}
    </Formik>
  );
};

ConfigPannel.propTypes = {
  expanded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    channel: PropTypes.string.isRequired,
    status: PropTypes.bool.isRequired,
    codes: PropTypes.string.isRequired,
  }).isRequired,
};

export default ConfigPannel;
