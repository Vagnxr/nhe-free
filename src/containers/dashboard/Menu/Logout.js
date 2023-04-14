import React from 'react';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

import LogoutIcon from 'static/icons/logout.svg';

import { mapDispatchToProps } from 'utils/helpers';
import { clearStore as clearStoreAction } from 'modules/login/actions';

const useStyles = makeStyles({
  root: {
    padding: '40px 0 10px 0',
    width: '550px',
    height: '300px',
  },
  iconContainer: {
    marginBottom: '15px',
    height: '90px',
    width: '90px',
  },
  dialogTitle: {
    textAlign: 'center',
    color: '#009de1',
    fontSize: '18px',
    fontWeight: 600,
  },
});

const Logout = ({ handleClose, open, actions: { clearStoreAction: clearStore } }) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      classes={{
        paper: classes.root,
      }}
    >
      <DialogContent>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <div className={classes.iconContainer}>
              <ReactSVG src={LogoutIcon} />
            </div>
          </Grid>
          <Grid item>
            <Typography className={classes.dialogTitle}>REALIZAR LOGOUT</Typography>
            <Typography>DESEJA REALMENTE SAIR DA APLICAÇÃO?</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-around">
          <Grid item>
            <Button onClick={clearStore} color="primary" variant="outlined">
              Sim
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={handleClose} color="primary" variant="outlined" autoFocus>
              Não
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

Logout.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    clearStore: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(
  null,
  mapDispatchToProps({ clearStoreAction }),
)(Logout);
