/* eslint-disable react/prop-types */
import React from 'react';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Pannel from 'components/Pannel';

import { validateDisconnectRequest, resetDisconnectValid } from 'modules/config/disconnect/actions';

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

const isDisabled = formValues => Object.keys(formValues).some(key => !formValues[key]);

const ConfigPannel = ({ expanded, handleChange }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { valid } = useSelector(({ configDisconnect }) => configDisconnect);

  return (
    <Formik
      onSubmit={() => {
        // This is intentional
      }}
      initialValues={{ loginsUsuarios: '' }}
      validationSchema={ConfigSchema}
    >
      {props => {
        const {
          values,
          handleChange: handleChangeForm,
          handleBlur,
          touched,
          errors,
          handleReset,
        } = props;
        if (valid) {
          handleReset();
          dispatch(resetDisconnectValid());
        }

        const disabled = isDisabled(values);
        return (
          <Pannel title="Configurar" expanded={expanded} handleChange={handleChange}>
            <Grid container spacing={2}>
              <Grid direction="column" justify="flex-start" item container md={6}>
                <Grid item>
                  <Typography className={classes.textTitle}>LOGIN DO USUÁRIO</Typography>
                  <Typography className={classes.subText}>
                    INSIRA OS LOGINS DE USUÁRIO, SEPARANDO-OS COM QUEBRA DE LINHA.
                  </Typography>
                </Grid>
              </Grid>
              <Grid direction="column" justify="space-between" item container md={6}>
                <Grid item>
                  <textarea
                    name="loginsUsuarios"
                    onBlur={handleBlur}
                    className={classes.textArea}
                    value={values.loginsUsuarios}
                    onChange={handleChangeForm}
                  />
                  {touched.loginsUsuarios && errors.loginsUsuarios && (
                    <Typography className={classes.error}>{errors.loginsUsuarios}</Typography>
                  )}
                </Grid>
              </Grid>
              <Grid container justify="flex-end" item xs={12}>
                <Grid item className={classes.buttonContainer}>
                  <Button
                    className={clsx(classes.button, { [classes.disabled]: disabled })}
                    variant="outlined"
                    disabled={disabled}
                    onClick={() => dispatch(validateDisconnectRequest({ values }))}
                  >
                    DESCONECTAR
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
