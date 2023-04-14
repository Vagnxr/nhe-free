import React from 'react';

import Grid from '@material-ui/core/Grid/Grid';
import { makeStyles } from '@material-ui/styles';

import ItemHistorico from './itemHistorico';

const useStyles = makeStyles({
  container: {
    width: '100%',
  },
});

const ItensHistorico = ({ historico }: { historico: ItemHistorico[] }) => {
  const classes = useStyles();
  return (
    <Grid direction="column" className={classes.container}>
      {historico.map((itemHistorico: ItemHistorico) => (
        <ItemHistorico
          mensagem={itemHistorico.mensagem}
          status={itemHistorico.status}
          canal={itemHistorico.canal}
          dataInicio={itemHistorico.dataInicio}
          analiseDocumento={itemHistorico.analiseDocumento}
          dataConfiguracao={itemHistorico.dataConfiguracao}
          nomeOperador={itemHistorico.nomeOperador}
          codigoOperador={itemHistorico.codigoOperador}
        />
      ))}
    </Grid>
  );
};

export default ItensHistorico;
