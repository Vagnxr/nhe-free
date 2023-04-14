import React from 'react';
import PropTypes from 'prop-types';
import ReactSVG from 'react-svg';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import Visibility from 'static/icons/icon-password.svg';
import VisibilityOff from 'static/icons/icon-password-off.svg';
import UserTextFieldIcon from 'static/icons/icon-login.svg';
import UserRCVIcon from 'static/icons/icon-user-rcv.svg';

import { loginRequest as loginRequestAction } from 'modules/login/actions';
import { mapDispatchToProps } from 'utils/helpers';

const useStyles = makeStyles({
  loginCard: {
    borderRadius: '10px',
    width: '320px',
    height: '370px',
    background: 'rgba(255, 255, 255, 0.8)',
    color: 'rgba(255, 255, 255, 0.8)',
    padding: '2rem',
    boxShadow: '9px 7px 39px -12px rgba(0, 0, 0, 0.54)',
  },
  loginTitle: {
    color: '#009de1',
    fontSize: '28px',
    fontFamily: 'DinBold',
  },
  iconContainer: {
    width: '98px',
    height: '98px',
  },
  loginFormInput: {
    fontSize: '18px',
  },
  loginButton: {
    color: 'black',
  },
  gridContainer: {
    height: '100%',
  },
  textGrid: {
    flexGrow: 1,
  },
});

const Login = ({ actions: { loginRequestAction: loginRequest } }) => {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const loginHandler = () => {
    const { username, password } = values;
    return username && password ? loginRequest({ username, password }) : undefined;
  };

  return (
    <Grid container justify="center" alignItems="center">
      <div className={classes.loginCard}>
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
          className={classes.gridContainer}
        >
          <Grid container item direction="column" justify="flex-start" alignItems="center">
            <Grid item>
              <div className={classes.iconContainer}>
                <ReactSVG src={UserRCVIcon} />
              </div>
            </Grid>
            <Grid item>
              <Typography className={classes.loginTitle}>LOGIN</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="column"
            justify="flex-start"
            alignItems="center"
            className={classes.textGrid}
          >
            <Grid item>
              <TextField
                label="USUÁRIO"
                required
                type="text"
                value={values.username}
                onChange={handleChange('username')}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton aria-label="Ícone de usuário">
                        <ReactSVG src={UserTextFieldIcon} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  classes: {
                    input: classes.loginFormInput,
                  },
                }}
              />
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel htmlFor="adornment-password" required>
                  SENHA
                </InputLabel>
                <Input
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  classes={{ input: classes.loginFormInput }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Clique para mudar visibilidade da senha"
                        onClick={handleClickShowPassword}
                      >
                        {values.showPassword ? (
                          <ReactSVG src={Visibility} />
                        ) : (
                          <ReactSVG src={VisibilityOff} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item direction="column" justify="center" alignItems="center">
            <Grid item>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className={classes.loginButton}
                onClick={loginHandler}
              >
                Entrar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

Login.propTypes = {
  actions: PropTypes.shape({
    loginRequestAction: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  mapDispatchToProps({ loginRequestAction }),
)(Login);
