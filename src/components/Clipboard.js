/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';
import { iconsBase64 } from 'utils/base64Icons';

import './clipboard.css';

class Clipboard extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isCopy: false,
    };
  }

  handleCopy = idToCopy => {
    const element = document.querySelector(`#${idToCopy}`);
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      document.execCommand('copy');
    } catch (err) {
      console.log('Oops, não foi  possível copiar!');
    }

    selection.removeAllRanges();

    this.setState(prevState => ({
      isCopy: !prevState.isCopy,
    }));

    setTimeout(() => {
      this.setState(prevState => ({
        isCopy: !prevState.isCopy,
      }));
    }, 2000);
  };

  render() {
    const { width } = this.props;
    return (
      <div className="clipboard">
        <img
          style={width}
          onClick={() => this.handleCopy(this.props.idToCopy)}
          src={iconsBase64.copy}
          alt="Copiar"
        />

        <CSSTransitionGroup
          transitionName="clipboard"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
        >
          {this.state.isCopy && <span className={`copied ${this.props.position}`}>Copiado!</span>}
        </CSSTransitionGroup>
        <span className="copiar">Copiar</span>
      </div>
    );
  }
}

Clipboard.propTypes = {
  width: PropTypes.object,
  position: PropTypes.string,
};

Clipboard.defaultProps = {
  width: { width: '35px', height: '20px' },
  position: 'top',
};

export default Clipboard;
