import React, { Fragment } from 'react';
import ReactSVG from 'react-svg';
import { useSelector, useDispatch } from 'react-redux';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import OpenCloseIcon from 'static/icons/icon-open-close.svg';

import { expandPannel } from 'modules/pesquisar/actions';
import { pesquisarPdvRequest } from 'modules/historico/actions';

import ItensHistorico from './itensHistorico';

import { makeStyles } from '@material-ui/styles';

interface PDV {
  pdv: string;
  analiseDocumento: boolean;
  expanded: boolean;
}

const useStyles = makeStyles({
  root: {
    borderRadius: '10px',
  },
  title: {
    marginRight: '10px',
  },
  ligado: {
    padding: '2px',
    color: 'green',
    border: '1px solid green',
  },
  desligado: {
    padding: '2px',
    color: 'red',
    border: '1px solid red',
  },
  loader: {
    margin: '0 auto',
  },
});

const ItensPDV = () => {
  const {
    pesquisar: { pdvs },
    historico: { historico, isFetching },
  } = useSelector((store: any) => store);
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <Fragment>
      {pdvs.map((pdv: PDV) => (
        <Grid item>
          <ExpansionPanel expanded={pdv.expanded} square classes={{ root: classes.root }}>
            <ExpansionPanelSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
              expandIcon={
                <ReactSVG
                  src={OpenCloseIcon}
                  onClick={() => {
                    dispatch(expandPannel({ pdv }));
                    if (!pdv.expanded) dispatch(pesquisarPdvRequest({ pdv: pdv.pdv }));
                  }}
                />
              }
            >
              <Typography className={classes.title}>PONTO DE VENDA {pdv.pdv}</Typography>
              <Typography className={pdv.analiseDocumento ? classes.ligado : classes.desligado}>
                {pdv.analiseDocumento ? 'LIGADO' : 'DESLIGADO'}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {isFetching ? (
                <CircularProgress className={classes.loader} />
              ) : (
                <ItensHistorico historico={historico} />
              )}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      ))}
    </Fragment>
  );
};

export default ItensPDV;
