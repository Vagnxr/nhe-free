import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import OpenCloseIcon from 'static/icons/icon-open-close.svg';

const useStyles = makeStyles({
  title: {
    color: '#6B6B6B',
    fontFamily: 'Dinbold',
    fontWeight: 500,
  },
  root: {
    boxShadow: 'none',
    borderRadius: '20px',
  },
  details: ({ direction }) => ({
    flexDirection: direction,
  }),
});

const Pannel = ({ expanded, handleChange, title, children, direction }) => {
  const classes = useStyles({ expanded, direction });
  return (
    <ExpansionPanel classes={{ root: classes.root }} square expanded={expanded}>
      <ExpansionPanelSummary
        expandIcon={<ReactSVG src={OpenCloseIcon} onClick={handleChange} />}
        aria-controls="panel1d-content"
        id="panel1d-header"
      >
        <Typography className={classes.title}>{title.toUpperCase()}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails classes={{ root: classes.details }}>{children}</ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

Pannel.defaultProps = {
  direction: 'row',
};

Pannel.propTypes = {
  title: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
};

export default Pannel;
