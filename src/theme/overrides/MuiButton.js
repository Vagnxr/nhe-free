import BorderOutlinedButton from 'static/images/bordabotao.png';

import { black, white } from '../colors';

export default {
  outlinedPrimary: {
    borderRadius: '20px',
    outline: 'none',
    color: black,
    background: `transparent url(${BorderOutlinedButton}) no-repeat`,
    backgroundSize: '197px 42px',
    width: '197px',
    height: '42px',
    maxWidth: '200px',
    textAlign: 'center',
    cursor: 'pointer',
    textTransform: 'uppercase',
    fontSize: '1.2em',
    border: 0,
    margin: 0,
    padding: 0,
    transition: '0.2s',
    paddingTop: '2px',
    lineHeight: '1em',

    '&:hover': {
      backgroundColor: 'transparent',
      background: 'linear-gradient(135deg, #d31a15 0%, #223573 50%, #5799dd 100%)',
      stroke: 'none',
      width: '197px',
      height: '42px',
      color: white,
      border: 'transparent',
    },
    '&$disabled': {
      background: '#B9B9B9',
      color: '#FFF',
    },
  },
};
