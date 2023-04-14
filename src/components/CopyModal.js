/* eslint-disable react/prop-types */
/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Portal from 'react-md/lib/Helpers/Portal';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { hideCopy as hideModalAction } from 'modules/ui/copy/actions';
import { mapDispatchToProps } from 'utils/helpers';
import AtencaoIcon from 'static/icons/alerta.svg';

import Clipboard from './Clipboard';

import './modal.css';

const styles = {
  button: {
    background: 'linear-gradient(135deg, #233674 0%, #0698dc 100%)',
    borderRadius: '20px',
    display: 'block',
    margin: '10px auto',
    color: '#FFF',
    width: '180px',
    height: '30px',
  },
};

class ModalDetails extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isToogleOn: false,
    };
  }

  handleDetails = () => {
    this.setState(prevState => ({
      isToogleOn: !prevState.isToogleOn,
    }));
  };

  handleCancel = () => {
    this.props.hideModalDetails();
  };

  render() {
    const {
      show,
      pdvs,
      message,
      actions: { hideModalAction: hideModal },
      classes,
    } = this.props;

    return (
      <Portal visible={show}>
        <div className="md-overlay md-overlay-details md-overlay--active">
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '100vh',
              alignItems: 'center',
              justify: 'center',
            }}
          >
            <div className="details-box">
              <div className="icon-container">
                <ReactSVG src={AtencaoIcon} />
              </div>

              <div className="msg-content">
                <p>{message}</p>
              </div>

              <div className="msg-content">
                <p id="pdvs">{pdvs}</p>
              </div>

              <div className="msg-details">
                <Clipboard idToCopy="pdvs" position="top" />
              </div>

              <Button onClick={hideModal} className={classes.button}>
                OK
              </Button>
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}

const propTypes = {
  actions: PropTypes.shape({
    hideModalAction: PropTypes.func.isRequired,
  }).isRequired,
  show: PropTypes.bool,
  message: PropTypes.string,
  classes: PropTypes.shape({}),
};

const defaultProps = {
  message: '',
  show: false,
  details: '',
  title: 'ERRO',
  alert: false,
  detailLabel: 'Detalhes',
};

ModalDetails.defaultProps = defaultProps;

ModalDetails.propTypes = propTypes;

const mapStateToProps = ({ uiCopy: { show, message, pdvs } }) => ({
  show,
  message,
  pdvs,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps({ hideModalAction }),
  )(ModalDetails),
);
