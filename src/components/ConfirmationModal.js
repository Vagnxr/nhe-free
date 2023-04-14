import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSVG from 'react-svg';

import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

import ConfirmationIcon from 'static/icons/icon-question.svg';

import { hideModalConfirmation } from 'modules/ui/confirmationModal/actions';
import { saveRequest } from 'modules/config/actions';
import { saveSeguroRequest } from 'modules/config/seguro/actions';

const useStyles = makeStyles({
  root: {
    padding: '40px 0 10px 0',
    width: '550px',
    height: '300px',
  },
  iconContainer: {
    marginBottom: '15px',
    height: '80px',
    width: '80px',
  },
  dialogTitle: {
    textAlign: 'center',
    color: '#009de1',
    fontSize: '18px',
    fontWeight: 600,
  },
});

const ConfirmationModal = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, description, seguro, onConfirm } = useSelector(
    ({ uiConfirmationModal }) => uiConfirmationModal,
  );
  const { canal, pontosDeVenda, data, status } = useSelector(
    seguro ? ({ configSeguro }) => configSeguro : ({ config }) => config,
  );
  const handleConfirmation = () => {
    onConfirm
      ? dispatch(onConfirm())
      : dispatch(
          seguro
            ? saveSeguroRequest({ values: { canal, pontosDeVenda, status } })
            : saveRequest({ values: { canal, pontosDeVenda, data, status } }),
        );
  };
  const handleClose = () => dispatch(hideModalConfirmation());
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
              <ReactSVG src={ConfirmationIcon} />
            </div>
          </Grid>
          <Grid item>
            <Typography className={classes.dialogTitle}>CONFIRMAR</Typography>
            <Typography>{description}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid container justify="space-around">
          <Grid item>
            <Button
              onClick={() => {
                handleConfirmation();
                handleClose();
              }}
              color="primary"
              variant="outlined"
            >
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

export default ConfirmationModal;
