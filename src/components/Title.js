import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  title: {
    fontFamily: 'DinMedium',
    fontSize: '22px',
    fontWeight: 500,
    color: '#009de1',
  },
});

const Title = ({ title }) => {
  const classes = useStyles();
  return (
    <Grid item>
      <Typography className={classes.title}>{title.toUpperCase()}</Typography>
    </Grid>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
