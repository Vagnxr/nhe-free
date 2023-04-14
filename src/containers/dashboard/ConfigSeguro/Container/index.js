import React, { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';

import Title from 'components/Title';
import ConfigPannel from './ConfigPannel';
import SearchPannel from './SearchPannel';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto 10%',
  },
  titleContainer: {
    margin: '20px 0',
  },
  configContainer: {
    margin: '20px 0',
  },
  searchContainer: {
    margin: '20px 0',
  },
});

const Container = () => {
  const [{ config, search }, setState] = useState({ config: true, search: false });
  const classes = useStyles();
  const handleChange = () => setState({ config: !config, search: !search });
  return (
    <div className={classes.container}>
      <Grid className={classes.titleContainer}>
        <Title title="CONFIGURAÇÃO DE VENDA DE SEGURO PROTEÇÃO MÓVEL" />
      </Grid>
      <div className={classes.configContainer}>
        <ConfigPannel expanded={config} handleChange={handleChange} />
      </div>
      <div className={classes.searchContainer}>
        <SearchPannel expanded={search} handleChange={handleChange} />
      </div>
    </div>
  );
};

export default Container;
