import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  text: {
    color: '#8d8d8d',
    fontSize: '16px',
    letterSpacing: '1px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '10px',
    paddingBottom: 0,
  },
  loaderSection: {
    zIndex: 1999999,
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: '0 auto',
    height: '100vh',
    width: '100%',
    overflowY: 'auto',
    backgroundColor: '#f5f6f5',
    opacity: '0.9',
    display: 'block',
  },
  aligner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  loader: {
    margin: '0 auto',
    width: '100%',
  },
  loadingBlock: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    display: 'inline-block',
    position: 'absolute',
    left: '50%',
    marginLeft: '-10px',
    animation: '3s infinite linear',
  },
  firstBlock: {
    background: '#1d8ec9',
    animation: '$net 1.2s infinite linear',
  },
  secondBlock: {
    background: '#c02a22',
    zIndex: 100,
  },
  thirdBlock: {
    background: '#21336e',
    animation: '$embratel 1.2s infinite linear',
  },
  '@keyframes embratel': {
    '0%': {
      transform: 'translateX(20px)',
    },
    '50%': {
      transform: 'translateX(-20px)',
    },
    '100%': {
      transform: 'translateX(20px)',
      zIndex: 200,
    },
  },
  '@keyframes net': {
    '0%': {
      transform: 'translateX(-20px)',
      zIndex: 200,
    },
    '50%': {
      transform: 'translateX(20px)',
    },
    '100%': {
      transform: 'translateX(-20px)',
    },
  },
});

const Loader = ({ show }) => {
  const classes = useStyles();
  return (
    show && (
      <div className={classes.loaderSection}>
        <div className={classes.aligner}>
          <div className={classes.loader}>
            <h1 className={classes.text}>Carregando...</h1>
            <span className={clsx(classes.loadingBlock, classes.firstBlock)} />
            <span className={clsx(classes.loadingBlock, classes.secondBlock)} />
            <span className={clsx(classes.loadingBlock, classes.thirdBlock)} />
          </div>
        </div>
      </div>
    )
  );
};

Loader.propTypes = {
  show: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ uiLoader: { show } }) => ({ show });

export default connect(mapStateToProps)(Loader);
