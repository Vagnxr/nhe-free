import { grey } from '@material-ui/core/colors';
import palette from '../palette';

export default {
  day: {
    color: grey['900'],
    fontWeight: '700',
    '&$selected': {
      background: 'linear-gradient(180deg, #E40021 0%, #223573 50%, #2482BE 100%)',
    },
  },
  current: {
    background: palette.primary.main,
    color: grey['50'],
  },
};
