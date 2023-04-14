import React from 'react';
import { useDispatch } from 'react-redux';
import ReactSVG from 'react-svg';

import Grid from '@material-ui/core/Grid/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';

import { showModal } from 'modules/ui/modal/actions';

// @ts-ignore
import { escolherIcone, escolherMensagem, formatDate, formatHour } from './utils.ts';

interface ItemHistorico {
  status: string;
  canal: string;
  dataInicio: string;
  analiseDocumento: boolean;
  dataConfiguracao: string;
  nomeOperador: string;
  codigoOperador: string;
  mensagem: string;
}

const useStyles = makeStyles({
  textTitle: ({ historico }: { historico: boolean }) => ({
    color: historico ? '#B9B9B9' : '#009DE1',
    fontFamily: 'dinmedium',
    fontSize: '16px',
    lineHeight: '16px',
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    marginBottom: '2px',
    textTransform: 'uppercase',
  }),
  container: {
    margin: '15px 2px',
  },
  iconContainer: {
    width: '50%',
  },
  text: ({ historico }: { historico: boolean }) => ({
    color: historico ? '#B9B9B9' : 'black',
  }),
});

const ItemHistorico = (props: ItemHistorico) => {
  const classes = useStyles({ historico: props.status === 'NAO_VIGENTE' });
  const dispatch = useDispatch();
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
        <Grid item container direction="column" justify="center" className={classes.iconContainer}>
          <Grid item>
            <Tooltip title={escolherMensagem(props.status)}>
              <ReactSVG
                onClick={() =>
                  dispatch(
                    showModal({
                      show: !!props.mensagem,
                      message: props.mensagem,
                      details: '',
                      title: 'ATENÇÃO',
                      alert: true,
                      sucesso: false,
                    }),
                  )
                }
                src={escolherIcone(props.status)}
              />
            </Tooltip>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>CANAL</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{props.canal}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>DATA INÍCIO</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{formatDate(props.dataInicio)}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>ANÁLISE DE DOCUMENTO</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>
              {props.analiseDocumento ? 'LIGADO' : 'DESLIGADO'}
            </Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>DATA DA CONFIGURAÇÃO</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>{`${formatDate(
              props.dataConfiguracao,
            )} - ${formatHour(props.dataConfiguracao)}`}</Typography>
          </Grid>
        </Grid>
        <Grid item container direction="column">
          <Grid item>
            <Typography className={classes.textTitle}>OPERADOR</Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.text}>
              {props.codigoOperador} - {props.nomeOperador}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ItemHistorico;
