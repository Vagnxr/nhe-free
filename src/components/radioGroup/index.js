/* eslint-disable react/forbid-prop-types */
import React, { Fragment } from 'react';
import { lightGray } from 'theme/colors';
import PropTypes from 'prop-types';
import { withStyles, Typography, Grid } from '@material-ui/core';
import classNames from 'classnames';
import Options from './options';

const styles = theme => ({
  root: {
    width: '250px',
    height: 'fit-content',
    border: 'solid 1px',
    borderColor: theme.palette.gray.dark,
    borderRadius: '20px',
    padding: '2px 2px 2px 2px',
    backgroundColor: '#F9F9F9',
  },
  textTitle: {
    color: '#009DE1',
    fontFamily: 'dinmedium',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '16px',
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left',
    marginBottom: '16px',
  },
  disabled: {
    color: 'rgba(0, 0, 0, 0.38)',
  },
  options: {
    borderRadius: '30px',
  },
  error: {
    color: theme.palette.status.error,
    fontFamily: '"DINPro", sans-serif',
    marginBottom: '10px',
    textAlign: 'center',
    width: '100%',
    marginLeft: '10px',
    marginTop: '5px',
  },
});

const CustomRadioGroup = ({
  classes,
  title,
  options = [{ label: '', value: 0 }],
  active = 0,
  onChange,
  backgroundColor,
  disabled,
  wrap,
}) => (
  <Fragment>
    <Typography className={classNames(classes.textTitle, { [classes.disabled]: disabled })} noWrap>
      {title}
    </Typography>
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classNames(classes.root)}
    >
      <Grid item xs={12} container justify="center" className={classes.options} wrap={wrap}>
        <Options
          options={options}
          active={active}
          disabled={disabled}
          onChange={onChange}
          backgroundColor={backgroundColor}
        />
      </Grid>
    </Grid>
  </Fragment>
);

CustomRadioGroup.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: 0,
    }),
  ).isRequired,
  onChange: PropTypes.func,
  active: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]).isRequired,
  wrap: PropTypes.string,
  backgroundColor: PropTypes.string,
  disabled: PropTypes.bool,
};

CustomRadioGroup.defaultProps = {
  wrap: 'nowrap',
  onChange: () => {
    // This is intentional
  },
  backgroundColor: lightGray,
  disabled: false,
};

export default withStyles(styles)(CustomRadioGroup);
