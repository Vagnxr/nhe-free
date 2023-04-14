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
import React, { Fragment } from 'react';
import ReactSVG from 'react-svg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Portal from 'react-md/lib/Helpers/Portal';
import { CSSTransitionGroup } from 'react-transition-group';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import { hideModal as hideModalAction } from 'modules/ui/modal/actions';
import { mapDispatchToProps } from 'utils/helpers';
import { iconsBase64 } from 'utils/base64Icons';
import SucessoIcon from 'static/icons/acerto.svg';
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
      title,
      message,
      details,
      actions: { hideModalAction: hideModal },
      alert,
      sucesso,
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
              {alert || sucesso ? (
                <div className="icon-container">
                  <ReactSVG src={sucesso ? SucessoIcon : AtencaoIcon} />
                </div>
              ) : (
                <Fragment>
                  <img
                    className="server-error"
                    width="90"
                    src={iconsBase64.serverError}
                    alt="Erro"
                  />
                  <img
                    className="close-modal"
                    width="40"
                    src={iconsBase64.close}
                    alt="fechar"
                    onClick={hideModal}
                  />
                </Fragment>
              )}
              {alert ? (
                <h2>{title}</h2>
              ) : (
                <h2 className="alert" style={{ color: '#009DE1' }}>
                  {sucesso ? title : 'ATENÇÃO'}
                </h2>
              )}
              <div className="msg-content">
                <p>{message}</p>
              </div>
              {details && (
                <div className="details-footer">
                  <CSSTransitionGroup
                    transitionName="modal-details"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}
                  >
                    <div>
                      <div
                        className={`icon_arrow ${this.state.isToogleOn ? ' icon_arrow-up' : ''}`}
                        onClick={this.handleDetails}
                      />
                      <button onClick={this.handleDetails}>
                        {this.state.isToogleOn ? 'Fechar' : 'Detalhes'}
                      </button>
                    </div>
                  </CSSTransitionGroup>
                </div>
              )}

              <CSSTransitionGroup
                transitionName="modal-details"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}
              >
                {this.state.isToogleOn && (
                  <div className="msg-details">
                    <h2>{alert ? 'Orientações' : 'Informações técnicas'}</h2>
                    <p id="stack-trace" dangerouslySetInnerHTML={{ __html: details }} />
                    <Clipboard idToCopy="stack-trace" position="top" />
                  </div>
                )}
              </CSSTransitionGroup>
              {(alert || sucesso) && (
                <Button onClick={hideModal} className={classes.button}>
                  OK
                </Button>
              )}
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
  title: PropTypes.string,
  message: PropTypes.string,
  details: PropTypes.string.isRequired,
  alert: PropTypes.bool.isRequired,
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

const mapStateToProps = ({ uiModal: { show, message, title, details, alert, sucesso } }) => ({
  show,
  message,
  title,
  alert,
  details,
  sucesso,
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps({ hideModalAction }),
  )(ModalDetails),
);
