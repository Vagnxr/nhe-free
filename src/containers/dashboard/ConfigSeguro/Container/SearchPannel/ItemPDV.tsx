import React from 'react';
import ReactSVG from 'react-svg';

import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';

// @ts-ignore
import { escolherIcone, formatDate, canalText } from './utils.ts';

interface ItemPDV {
  pdv: string;
  canal: string;
  seguroMovel: boolean;
  status: string;
  dataConfiguracao: string;
  operador: string;
  message: string;
}

const useStyles = makeStyles({
  textTitle: {
    color: '#009DE1',
    fontFamily: 'dinmedium',
    fontSize: '16px',
    lineHeight: '16px',
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    marginBottom: '2px',
    textTransform: 'uppercase',
  },
  container: {
    margin: '15px 2px',
  },
  iconContainer: {
    width: '50%',
  },
  text: {
    color: '#6b6b6b',
  },
});

const ItemPDV = ({ pdv, canal, seguroMovel, dataConfiguracao, operador, status }: ItemPDV) => {
  const classes = useStyles();

  return (
    <Grid item>
      <Divider />
      <Grid
        container
        direction="row"
        wrap="nowrap"
        alignItems="center"
        className={classes.container}
        spacing={1}
      >
        {status && (
          <Grid
            item
            container
            direction="column"
            justify="center"
            className={classes.iconContainer}
          >
            <Grid item>
              <ReactSVG src={escolherIcone(status)} />
            </Grid>
          </Grid>
        )}
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>CANAL</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{canalText(canal)}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>CÓDIGO DO PDV</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{pdv}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>VENDA DE SEGURO</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{seguroMovel ? 'LIGADO' : 'DESLIGADO'}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>DATA DA CONFIGURAÇÃO</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{`${formatDate(dataConfiguracao)}`}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>OPERADOR</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{operador}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemPDV;
