/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Button, Grid } from '@material-ui/core';

const styles = theme => ({
  buttonChildren: {
    background: `linear-gradient(to right, #233573 0%, #059BDF 100%)`,
    color: theme.palette.white.main,
    borderRadius: '24px',
    minWidth: '120px',
    minHeight: '30px',
    border: 0,
    margin: 0,
    fontFamily: 'dinmedium',
    fontSize: '16px',
  },
  buttonContainer: {
    padding: '1px 2px',
  },
  buttonInactive: {
    background: 'transparent',
    color: '#6B6B6B',
    '&:hover': {
      background: `linear-gradient(to right, #233573 0%, #059BDF 100%)`,
      color: theme.palette.white.main,
    },
  },
  disabled: {
    color: theme.palette.gray.dark,
  },
  noWrap: {
    whiteSpace: 'nowrap',
  },
});

const RadioGroupOptions = ({ classes, options, active, onChange, disabled }) =>
  options.map((option, index) => (
    <Grid item key={`radioGroupOption-${index}`} className={classes.buttonContainer}>
      <Button
        key={option.value}
        className={classNames(classes.buttonChildren, {
          [classes.buttonInactive]: active !== option.value,
        })}
        color="primary"
        onClick={() => onChange(option.value, false)}
        disabled={disabled}
      >
        <div className={classes.noWrap}>{option.label}</div>
      </Button>
    </Grid>
  ));

RadioGroupOptions.propTypes = {
  classes: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: 0,
    }),
  ),
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
};

export default withStyles(styles)(RadioGroupOptions);
